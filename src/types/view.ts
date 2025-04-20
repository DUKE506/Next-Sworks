export const ViewState = {
    '10': 10,
    '20': 20,
    '30': 30,
    '50': 50,
    '100': 100,
}

export type ViewUnionType = (typeof ViewState)[keyof typeof ViewState]