/* eslint-disable @typescript-eslint/only-throw-error */
import {
  createUploadthing,
  UTFiles,
  type FileRouter,
} from "uploadthing/next-legacy";
import { UploadThingError } from "uploadthing/server";
import { MeDocument, Role } from "~/generated/generated";
import { type NextApiRequest, type NextApiResponse } from "next";
import { client } from "~/lib/apollo";
import { getToken } from "next-auth/jwt";

const authenticateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = await getToken({ req: req })
    if (!token) return null;

    const { data } = await client.query({
      query: MeDocument,
      context: {
        headers: {
          "Authorization": `Bearer ${token.accessToken}`
        }
      }
    })

    if (data.me.__typename === "Error")
      return null;

    return data.me.data
  } catch (e) {
    console.log(e)
    return null
  }
};

const f = createUploadthing();

export const uploadRouter = {
  accommodation: f({
    image: {
      maxFileCount: 1,
      maxFileSize: "4MB",
    },
  })
    .middleware(async ({ req, res, files }) => {
      const user = await authenticateUser(req, res);
      if (!user)
        throw new UploadThingError({
          message: "Unauthorized",
          code: "FORBIDDEN",
        });
      const customId = req.headers.custom_id as string | undefined;
      return {
        [UTFiles]: files.map((file) => ({
          ...file,
          ...(customId ? {
            customId: customId.replace(/[\s\\/]/g, "_"),
          } : {
            customId: file.name + "_" + file.lastModified
          })
        })),
      };
    })
    .onUploadError((error) => {
      console.error("Error uploading accommodation image: ", error);
    })
    .onUploadComplete((data) => {
      console.log("Accomodation Image: ", data.file.url);
    }),

  asset: f({
    image: {
      maxFileCount: 50,
      maxFileSize: "512KB",
    },
    video: {
      maxFileCount: 50,
      maxFileSize: "16MB",
    },
    "model/gltf-binary": {
      maxFileCount: 50,
      maxFileSize: "4MB",
    },
  })
    .middleware(async ({ req, res, files }) => {
      const user = await authenticateUser(req, res);
      if (!user || user.role !== Role.Admin)
        throw new UploadThingError({
          message: "Unauthorized",
          code: "FORBIDDEN",
        });
      const customId = req.headers.custom_id as string | undefined;
      return {
        [UTFiles]: files.map((file) => ({
          ...file,
          ...(customId ? {
            customId: customId.replace(/[\s\\/]/g, "_"),
          } : {
            customId: file.name + "_" + file.lastModified
          })
        })),
      };
    })
    .onUploadError((error) => {
      console.error("Error uploading gallery image: ", error);
    })
    .onUploadComplete((data) => {
      console.log("Gallery image: ", data.file.url);
    }),

  event: f({
    image: {
      maxFileCount: 1,
      maxFileSize: "512KB",
    },
  })
    .middleware(async ({ req, res, files }) => {
      const user = await authenticateUser(req, res);
      if (!user || (user.role !== Role.Admin && user.role !== Role.Organizer))
        throw new UploadThingError({
          message: "Unauthorized",
          code: "FORBIDDEN",
        });
      const customId = req.headers.custom_id as string | undefined;
      return {
        [UTFiles]: files.map((file) => ({
          ...file,
          ...(customId ? {
            customId: customId.replace(/[\s\\/]/g, "_"),
          } : {
            customId: file.name + "_" + file.lastModified
          })
        })),
      };
    })
    .onUploadError((error) => {
      console.error("Error uploading event image: ", error);
    })
    .onUploadComplete((data) => {
      console.log("Event image: ", data.file.key);
    }),

  quiz: f({
    image: {
      maxFileCount: 1,
      maxFileSize: "512KB",
    },
  })
    .middleware(async ({ req, res, files }) => {
      const user = await authenticateUser(req, res);
      if (!user || (user.role !== Role.Admin && user.role !== Role.Organizer))
        throw new UploadThingError({
          message: "Unauthorized",
          code: "FORBIDDEN",
        });
      const customId = req.headers.custom_id as string | undefined;
      return {
        [UTFiles]: files.map((file) => ({
          ...file,
          ...(customId ? {
            customId: customId.replace(/[\s\\/]/g, "_"),
          } : {
            customId: file.name + "_" + file.lastModified
          })
        })),
      };
    })
    .onUploadError((error) => {
      console.error("Error uploading question image: ", error);
    })
    .onUploadComplete((data) => {
      console.log("Question image: ", data.file.key);
    }),

  sponsor: f({
    image: {
      maxFileCount: 50,
      maxFileSize: "512KB",
    },
  })
    .middleware(async ({ req, res, files }) => {
      const user = await authenticateUser(req, res);
      if (!user || user.role !== Role.Admin)
        throw new UploadThingError({
          message: "Unauthorized",
          code: "FORBIDDEN",
        });
      const customId = req.headers.custom_id as string | undefined;
      return {
        [UTFiles]: files.map((file) => ({
          ...file,
          ...(customId ? {
            customId: customId.replace(/[\s\\/]/g, "_"),
          } : {
            customId: file.name + "_" + file.lastModified
          })
        })),
      };
    })
    .onUploadError((error) => {
      console.error("Error uploading team image: ", error);
    })
    .onUploadComplete((data) => {
      console.log("Team image: ", data.file.key);
    }),

  team: f({
    image: {
      maxFileCount: 50,
      maxFileSize: "512KB",
    },
  })
    .middleware(async ({ req, res, files }) => {
      const user = await authenticateUser(req, res);
      if (!user || user.role !== Role.Admin)
        throw new UploadThingError({
          message: "Unauthorized",
          code: "FORBIDDEN",
        });
      const customId = req.headers.custom_id as string | undefined;
      return {
        [UTFiles]: files.map((file) => ({
          ...file,
          ...(customId ? {
            customId: customId.replace(/[\s\\/]/g, "_"),
          } : {
            customId: file.name + "_" + file.lastModified
          })
        })),
      };
    })
    .onUploadError((error) => {
      console.error("Error uploading team image: ", error);
    })
    .onUploadComplete((data) => {
      console.log("Team image: ", data.file.key);
    }),

    easterEgg: f({
      image: {
        maxFileCount: 1,
        maxFileSize: "4MB",
      },
    })
    .middleware(async ({ req, res, files }) => {
      const user = await authenticateUser(req, res);
      if (!user)
        throw new UploadThingError({
          message: "Unauthorized",
          code: "FORBIDDEN",
        });
      const customId = req.headers.custom_id as string | undefined;
      return {
        [UTFiles]: files.map((file) => ({
          ...file,
          ...(customId ? {
            customId: customId.replace(/[\s\\/]/g, "_"),
          } : {
            customId: file.name + "_" + file.lastModified
          })
        })),
      };
    })
      .onUploadError((error) => {
        console.error("Error uploading team image: ", error);
      })
      .onUploadComplete((data) => {
        console.log("Team image: ", data.file.key);
      }), 
} satisfies FileRouter;


export type UploadRouter = typeof uploadRouter;

export const uploadRouterEndpoints = Object.keys(uploadRouter) as (keyof typeof uploadRouter)[];

export type UploadRouterEndpoints = typeof uploadRouterEndpoints;
