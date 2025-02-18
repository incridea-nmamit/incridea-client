"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button, type ButtonProps } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

import { cn } from "~/lib/utils";

type Props = ButtonProps & {
  data: { id: string; name: string; [key: string]: unknown }[];
  value?: string;
  setValue?: (value: string) => void;
  placeholder: string;
  keywords?: string[];
  popoverClassName?: string;
};

const ComboBox: React.FunctionComponent<Props> = ({
  data,
  value,
  setValue,
  placeholder,
  className,
  children,
  keywords,
  popoverClassName,
  ...props
}) => {
  const [open, setOpen] = React.useState(false);

  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          {...props}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between truncate", className)}
        >
          {data.find((ele) => ele.id === value)?.name ?? placeholder}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "fixed top-0 w-full -translate-x-1/2 p-0",
          popoverClassName,
        )}
      >
        <Command loop>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>No results. {children}</CommandEmpty>
            <CommandGroup>
              {data.map((ele) => (
                <CommandItem
                  className="font-trap"
                  key={ele.id}
                  value={ele.id}
                  onSelect={(currentValue) => {
                    setValue?.(currentValue === value ? "" : ele.id);
                    setOpen(false);
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#ac7420";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "black";
                  }}
                  // By default, command searches in the values provided
                  // Since we want to uniquely identify each item we have passed the id
                  // But we are not searching indexed on the id, rather indexed on the name
                  // Hence we provide additional keywords to match name and get correct results
                  // FIXME(Omkar): This still searches against id provided, implement custom filter() on Command
                  keywords={[
                    ele.name,
                    ...(keywords?.map((key) => {
                      const temp = ele[key];
                      if (typeof temp === "string") return temp;
                      else return "";
                    }) ?? []),
                  ]}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === ele.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {ele.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export { ComboBox };
