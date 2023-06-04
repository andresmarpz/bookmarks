"use client"
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Group } from "@prisma/client";
import React, { useState } from "react";

interface Props {
  groups: Group[]
}

export default function SelectGroup({groups}: Props){
  const [currentValue, setCurrentValue] = useState<string>();

  return (
    <Select onValueChange={setCurrentValue}>
      <SelectTrigger className="w-36" defaultValue="all">
        <span className="flex w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
          {currentValue === 'all' ? 'All' : <SelectValue/>}
        </span>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectSeparator />
        {groups.map((group) => (
          <SelectItem key={"s-i-" + group.slug} value={group.slug}>
            {group.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
