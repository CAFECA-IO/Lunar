type IJSON =
  | string
  | number
  | boolean
  | null
  | IJSON[]
  | { [key: string]: IJSON };

export default IJSON;