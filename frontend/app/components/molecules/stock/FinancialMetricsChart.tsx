"use client";

import { Bar } from "react-chartjs-2";
import styled from "styled-components";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Container = styled.div`
  width: 620px;
  height: auto;
  padding: 10px;
  background-color: white;
  border-radius: 20px;
`;

const FinancialMetricsChart = () => {
  const dummyData = {
    output: [
      {
        stac_yymm: "202406",
        cras: "2178581.00",
        fxas: "2678996.00",
        total_aset: "4857577.00",
        flow_lblt: "843549.00",
        fix_lblt: "178761.00",
        total_lblt: "1022310.00",
        cpfn: "8975",
        cfp_surp: "99.99",
        prfi_surp: "99.99",
        total_cptl: "3835267.00",
      },
      {
        stac_yymm: "202312",
        cras: "1959366.00",
        fxas: "2599694.00",
        total_aset: "4559060.00",
        flow_lblt: "757195.00",
        fix_lblt: "165087.00",
        total_lblt: "922281.00",
        cpfn: "8975",
        cfp_surp: "99.99",
        prfi_surp: "99.99",
        total_cptl: "3636779.00",
      },
      {
        stac_yymm: "202212",
        cras: "2184706.00",
        fxas: "2299539.00",
        total_aset: "4484245.00",
        flow_lblt: "783449.00",
        fix_lblt: "153301.00",
        total_lblt: "936749.00",
        cpfn: "8975",
        cfp_surp: "99.99",
        prfi_surp: "99.99",
        total_cptl: "3547496.00",
      },
      {
        stac_yymm: "202112",
        cras: "2181632.00",
        fxas: "2084580.00",
        total_aset: "4266212.00",
        flow_lblt: "881171.00",
        fix_lblt: "336041.00",
        total_lblt: "1217212.00",
        cpfn: "8975",
        cfp_surp: "99.99",
        prfi_surp: "99.99",
        total_cptl: "3048999.00",
      },
      {
        stac_yymm: "202012",
        cras: "1982156.00",
        fxas: "1800201.00",
        total_aset: "3782357.00",
        flow_lblt: "756044.00",
        fix_lblt: "266834.00",
        total_lblt: "1022877.00",
        cpfn: "8975",
        cfp_surp: "99.99",
        prfi_surp: "99.99",
        total_cptl: "2759480.00",
      },
      {
        stac_yymm: "201912",
        cras: "1813853.00",
        fxas: "1711792.00",
        total_aset: "3525645.00",
        flow_lblt: "637828.00",
        fix_lblt: "259013.00",
        total_lblt: "896841.00",
        cpfn: "8975",
        cfp_surp: "99.99",
        prfi_surp: "99.99",
        total_cptl: "2628804.00",
      },
      {
        stac_yymm: "201812",
        cras: "1746974.00",
        fxas: "1646598.00",
        total_aset: "3393572.00",
        flow_lblt: "690815.00",
        fix_lblt: "225226.00",
        total_lblt: "916041.00",
        cpfn: "8975",
        cfp_surp: "99.99",
        prfi_surp: "99.99",
        total_cptl: "2477532.00",
      },
      {
        stac_yymm: "201712",
        cras: "1469825.00",
        fxas: "1547696.00",
        total_aset: "3017521.00",
        flow_lblt: "671751.00",
        fix_lblt: "200855.00",
        total_lblt: "872607.00",
        cpfn: "8975",
        cfp_surp: "99.99",
        prfi_surp: "99.99",
        total_cptl: "2144914.00",
      },
      {
        stac_yymm: "201612",
        cras: "1414297.00",
        fxas: "1207446.00",
        total_aset: "2621743.00",
        flow_lblt: "547041.00",
        fix_lblt: "145072.00",
        total_lblt: "692113.00",
        cpfn: "8975",
        cfp_surp: "99.99",
        prfi_surp: "99.99",
        total_cptl: "1929630.00",
      },
      {
        stac_yymm: "201512",
        cras: "1248147.00",
        fxas: "1173648.00",
        total_aset: "2421795.00",
        flow_lblt: "505029.00",
        fix_lblt: "126168.00",
        total_lblt: "631197.00",
        cpfn: "8975",
        cfp_surp: "99.99",
        prfi_surp: "99.99",
        total_cptl: "1790598.00",
      },
    ],
  };

  const labels = dummyData.output.map((item) => item.stac_yymm);
  const totalCapital = dummyData.output.map((item) =>
    parseFloat(item.total_cptl)
  );
  const totalLiabilities = dummyData.output.map((item) =>
    parseFloat(item.total_lblt)
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Total Capital",
        data: totalCapital,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Total Liabilities",
        data: totalLiabilities,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Total Capital vs Total Liabilities",
      },
    },
  };

  return (
    <Container>
      <Bar data={data} options={options} />
    </Container>
  );
};

export default FinancialMetricsChart;
