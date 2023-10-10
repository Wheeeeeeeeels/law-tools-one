import React from 'react';
import { Bar, Pie } from '@ant-design/charts';

export default function Report() {
    // 站点数据获取状态的条形图数据
    const barData = [
        { date: '2023-10-03', value: 5000 },
        { date: '2023-10-04', value: 0 },
        { date: '2023-10-05', value: 0 },
        { date: '2023-10-06', value: 1 },
        { date: '2023-10-07', value: 5 },
        { date: '2023-10-08', value: 10 },
        { date: '2023-10-09', value: 1 },
        { date: '2023-10-10', value: 7 }
    ];

    const barConfig = {
        title: {
            visible: true,
            text: '日期分布图'
        },
        description: {
            visible: true,
            text: '站点数据获取状态的分布情况'
        },
        forceFit: true,
        data: barData,
        xField: 'date',
        yField: 'value',
        colorField: 'type'
    };

    // 站点分类的饼图数据
    const pieData = [
        { type: '成功', value: 44 },
        { type: '失败', value: 108 }
    ];

    const pieConfig = {
        forceFit: true,
        title: {
            visible: true,
            text: '站点分类'
        },
        description: {
            visible: true,
            text: '站点的成功与失败的分类情况'
        },
        radius: 0.8,
        data: pieData,
        angleField: 'value',
        colorField: 'type',
        label: {
            visible: true,
            type: 'outer',
            offset: 20
        }
    };

    return (
        <div>
            {/* <Bar {...barConfig} /> */}
            <Pie {...pieConfig} />
        </div>
    );
}
