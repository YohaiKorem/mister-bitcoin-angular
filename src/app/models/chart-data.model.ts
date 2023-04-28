import { ChartDataValue } from './chartDataValue.model';

export class ChartData {
  constructor(
    public status: string,
    public name: string,
    public unit: string,
    public period: string,
    public description: string,
    public values: ChartDataValue[]
  ) {}
}

export function easyCreateChartData(data: any) {
  let { status, name, unit, period, description, values } = data;
  return new ChartData(status, name, unit, period, description, values);
}
