import { useEffect, useState } from "react";
export function getSpecificGroupInfo(group: any, id: any) {
  const spGroup = group.filter((g: any) => g.groupId == id);
  return spGroup[0];
}
