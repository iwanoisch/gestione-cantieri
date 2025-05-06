import {Chart} from "react-google-charts";
import {columns, optionsGantt, rows} from "../../dataMok/MOCK_GANT.ts";


export const GanttTab = () => {

    const dataGantt = [columns, ...rows];

    return <Chart  chartType="Gantt" width="100%" height="100%" data={dataGantt} options={optionsGantt} chartLanguage={'it-it'}/>
}
