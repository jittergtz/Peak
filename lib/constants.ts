export enum CollectionColors {
    sunset = "bg-gradient-to-r from-red-500 to-orange-400",
    siren = "bg-gradient-to-r from-red-700 to-blue-700",
    snowflake = "bg-gradient-to-r from-sky-600 to-neutral-100",
    firtree = "bg-gradient-to-r from-emerald-500 to-emerald-900",
    Metal = "bg-gradient-to-r from-slate-600 to-slate-700",
    Bliss = "bg-gradient-to-r from-purple-600 to-blue-700",
    "Light Metal" = "bg-gradient-to-r from-gray-300 to-gray-500",
    "Golden hour" = "bg-gradient-to-r from-yellow-500 to-yellow-800",
    Coffee = "bg-gradient-to-r from-stone-700 to-stone-900 ",
    Pacific = "bg-gradient-to-r from-blue-800 to-blue-500",

  
}

export type CollectionColor = keyof typeof CollectionColors;