import { ComponentProps, useMemo, useState } from 'react';
import { cn } from '~/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export type BirthdateProps = ComponentProps<'div'>;

const getDaysInMonth = (month: number, year: number) =>
  new Date(year, month, 0).getDate();

const generateRange = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

export function Birthdate({ className, ...props }: BirthdateProps) {
  const currentYear = new Date().getFullYear();
  const allDays = generateRange(1, 31);
  const allMonths = generateRange(1, 12);
  const allYears = generateRange(currentYear - 100, currentYear);

  const [day, setDay] = useState<number | ''>('');
  const [month, setMonth] = useState<number | ''>('');
  const [year, setYear] = useState<number | ''>('');

  // Month visibility based on selected day
  const visibleMonths = useMemo(() => {
    if (!day) return allMonths;
    const assumedYear = typeof year === 'number' ? year : 2024;
    return allMonths.filter((m) => getDaysInMonth(m, assumedYear) >= day);
  }, [allMonths, day, year]);

  // Day visibility based on selected month and year
  const visibleDays = useMemo(() => {
    if (month) {
      const testYear = typeof year === 'number' ? year : 2024;
      return allDays.filter((d) => d <= getDaysInMonth(month, testYear));
    }
    return allDays;
  }, [allDays, month, year]);

  // Year visibility: Feb 29 should only allow leap years
  const visibleYears = useMemo(() => {
    if (day === 29 && month === 2) {
      return allYears.filter((y) => getDaysInMonth(2, y) === 29);
    }
    return allYears;
  }, [allYears, day, month]);

  // Construct birthdate for hidden input
  const birthdate =
    day && month && year ? new Date(year, month - 1, day).toISOString() : '';

  return (
    <div className={cn('flex gap-2', className)} {...props}>
      {/* Day */}
      <Select
        value={day.toString()}
        onValueChange={(value) => setDay(Number(value) || '')}
      >
        <SelectTrigger className="flex-1">
          <SelectValue placeholder="Day" />
        </SelectTrigger>
        <SelectContent>
          {visibleDays.map((d) => (
            <SelectItem key={d} value={d.toString()}>
              {d}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Month */}
      <Select
        value={month.toString()}
        onValueChange={(value) => setMonth(Number(value) || '')}
      >
        <SelectTrigger className="flex-1">
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent>
          {visibleMonths.map((m) => (
            <SelectItem key={m} value={m.toString()}>
              {new Date(2000, m - 1).toLocaleString('default', {
                month: 'long',
              })}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Year */}
      <Select
        value={year.toString()}
        onValueChange={(value) => setYear(Number(value) || '')}
      >
        <SelectTrigger className="flex-1">
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent>
          {visibleYears
            .slice()
            .reverse()
            .map((y) => (
              <SelectItem key={y} value={y.toString()}>
                {y}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      {/* Hidden input for form submission */}
      <input type="hidden" name="birthdate" value={birthdate} />
    </div>
  );
}
