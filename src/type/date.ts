export interface DateFormat {
  day: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  isCurrentDay: boolean;
  isFuture: boolean;
}

export interface Date {
  dates: DateFormat[];
}
