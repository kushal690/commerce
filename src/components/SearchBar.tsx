"use client";
import Icon from "@/lib/DynamicIcon";
import { FC, useEffect, useCallback } from "react";
import { Input } from "./ui/input";
import { useSearchbar } from "@/hooks/useSearchbar";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Button } from "./ui/button";

interface SearchBarProps { }

const SearchBar: FC<SearchBarProps> = ({ }) => {
  const searchModal = useSearchbar();

  const toggleModal = useCallback(() => {
    searchModal.setIsOpen(!searchModal.isOpen);
  }, [searchModal]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleModal();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggleModal]);

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        onClick={toggleModal}
      >
        <Icon name="search" className="h-4 w-4 xl:mr-2" aria-hidden="true" />
        <span className="hidden xl:inline-flex">Search products...</span>
        <span className="sr-only">Search products</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
          <abbr>Ctrl+</abbr>K
        </kbd>
      </Button>
      <CommandDialog open={searchModal.isOpen} onOpenChange={toggleModal}>
        <CommandInput placeholder="Search products..." />
        <CommandList>
          <CommandEmpty>No products found.</CommandEmpty>
          <CommandGroup title="Products">
            <CommandItem>Apple</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchBar;
