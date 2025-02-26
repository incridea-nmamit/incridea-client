#!/usr/bin/env bash

# Initialize variables
host_dir=""
git_branch=""
pm2_id=""

# Parse arguments
while getopts "d:b:i:" opt; do
  case "$opt" in
  d)
    host_dir="$OPTARG"
    ;;
  b)
    git_branch="$OPTARG"
    ;;
  i)
    pm2_id="$OPTARG"
    if ! [[ "$pm2_id" =~ ^[0-9]+$ ]]; then
      echo "Error: -i must be a number(PM2 ID)"
      exit 1
    fi
    ;;
  \?)
    echo "Usage: $0 -d <HOST_DIR> -b <GIT_BRANCH> -i <PM2_ID>"
    exit 1
    ;;
  esac
done

# Check if both flags are provided
if [[ -z "$host_dir" || -z "$git_branch" || -z "$pm2_id" ]]; then
  echo "Error: Follwing flags are required: -d -i -b"
  echo
  echo "Usage: $0 -d <HOST_DIR> -b <GIT_BRANCH> -i <PM2_ID>"
  exit 1
fi

echo "Deployment started 🚀"
echo

# Step 1: Pull latest changes
echo "Pulling git branch $git_branch"
echo
git pull origin $git_branch
if [ $? -ne 0 ]; then
  echo "failed: git pull origin $git_branch"
  echo
  exit 1
fi

# Step 2: Install dependencies
echo "Installing dependencies"
echo
bun i
if [ $? -ne 0 ]; then
  echo "failed: bun i"
  echo
  exit 1
fi

# Step 3: Build project
echo "Building project"
echo
bun run build
if [ $? -ne 0 ]; then
  echo "failed: bun run build"
  echo
  exit 1
fi

# Step 4: Stop PM2 process
echo "Stopping PM2 process with ID $pm2_id"
echo
pm2 stop $pm2_id
if [ $? -ne 0 ]; then
  echo "failed: pm2 stop $pm2_id"
  echo
  exit 1
fi

# Step 5: Remove host_dir directory
echo "Removing $host_dir directory"
echo
rm -rf $host_dir
if [ $? -ne 0 ]; then
  echo "failed: rm -rf $host_dir"
  echo
  exit 1
fi

# Step 6: Move build to $host_dir
echo "Moving build to $host_dir"
echo
mv build $host_dir
if [ $? -ne 0 ]; then
  echo "failed: mv build $host_dir"
  echo
  exit 1
fi

# Step 7: Restart PM2 process
echo "Restarting PM2 process with ID $pm2_id"
echo
pm2 restart $pm2_id
if [ $? -ne 0 ]; then
  echo "failed: pm2 restart $pm2_id"
  echo
  exit 1
fi

echo "Run follwing command to check logs: pm2 logs --lines 500 $pm2_id"
echo
echo "Deployment successful 🎉"
