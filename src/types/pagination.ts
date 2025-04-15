export const PageActionState = {
  FirstPage: "First",
  PrevPage: "Prev",
  NextPage: "Next",
  LastPage: "Last",
};

export type PageActionUnionType =
  (typeof PageActionState)[keyof typeof PageActionState];
