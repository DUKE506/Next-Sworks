export const WorkplaceStatusType = {
  계약: "계약",
  해약: "해약",
};

export type WorkplaceStatusType =
  (typeof WorkplaceStatusType)[keyof typeof WorkplaceStatusType];
