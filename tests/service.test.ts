import Gallons from '../src/model/volume.js';
import { MixReportRow, MixService } from '../src/services/MixService.js';

function verifyReportRow(reportRow: MixReportRow,
                        expectedStep: number,
                        expectedJugXFilledAmount: number,
                        expectedJugYFilledAmount: number,
                        expectedActionText: string,
): void {
  expect(reportRow.step).toEqual(expectedStep);
  expect(reportRow.jugX).toEqual(expectedJugXFilledAmount);
  expect(reportRow.jugY).toEqual(expectedJugYFilledAmount);
  expect(reportRow.action).toEqual(expectedActionText);
}

describe('Mix Report', () => {
  test('should show Success', () => {
    const mixService = new MixService();

    const jugXCapacity = Gallons.positive(2);
    const jugYCapacity = Gallons.positive(10);
    const targetVolume=Gallons.positive(4);

    const report = mixService.mix(jugXCapacity, jugYCapacity, targetVolume);

    expect(report.status).toEqual("Solved");
    expect(report.solution).toHaveLength(4);
    verifyReportRow(report.solution[0], 1, 2, 0, 'Fill Jug X');
    verifyReportRow(report.solution[1], 2, 0, 2, 'Transfer from Jug X to Jug Y');
    verifyReportRow(report.solution[2], 3, 2, 2, 'Fill Jug X');
    verifyReportRow(report.solution[3], 4, 0, 4, 'Transfer from Jug X to Jug Y');
  });
  test('should show No Solution', () => {
    const mixService = new MixService();

    const jugXCapacity = Gallons.positive(2);
    const jugYCapacity = Gallons.positive(6);
    const targetVolume=Gallons.positive(5);

    const report = mixService.mix(jugXCapacity, jugYCapacity, targetVolume);

    expect(report.status).toEqual("No Solution");
    expect(report.solution).toHaveLength(0);
  });
})
