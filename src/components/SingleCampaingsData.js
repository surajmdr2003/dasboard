import React, { useState, useEffect } from 'react';
import C3Chart from '@kaiouwang/react-c3js';
import 'c3/c3.css';
import moment from 'moment';
import GraphData from './GraphData';
import DatePickerField from '../components/form-fields/DatePickerField';

const primaryColor = '#22a6de';
const initialData = {
    x: 'x',
    columns: [
        ['x'],
        ['Impression']
    ],
    type: 'bar',
    colors: {
        Impression: primaryColor
    },
};

const size = {
    height: 280
}

const legend = {
    show: false
}

const bar = {
    width: {
        ratio: 0.5 // this makes bar width 50% of length between ticks
    }
}

const axis = {
    x: {
        type: 'timeseries',
        tick: {
            format: '%d-%m-%Y'
        },
        label: {
            position: 'inner-center'
        }
    },
    y: {
        show: false,
    }
}


const SingleCampaingsData = () => {
    const [data, setData] = useState(initialData); // For graph data
    const [activeAttr, setActive] = useState('impressions'); // For active graph (tab)
    const [filterDateTitle, setFilterDateTitle] = useState('Last 7 Days')

    useEffect(() => {
        const formatGraphData = () => {
            setData((prevVal) => {
                return {
                    ...prevVal,
                    columns: [
                        ['x', ...GraphData.AllCampaignDatas.date],
                        [activeAttr, ...GraphData.AllCampaignDatas.impressions]
                    ],
                    colors: {
                        [activeAttr]: primaryColor,
                    },
                }
            })
        }

        formatGraphData()
    }, [initialData])

    const updateGraph = (label) => {
        setData((prevData) => {
            return ({
                ...prevData,
                columns: [
                    ['x', ...GraphData.AllCampaignDatas.date],
                    [label, ...GraphData.AllCampaignDatas[label]]
                ],
                colors: {
                    [label]: primaryColor,
                },
            })
        });
        setActive(label);
    }

    const AllCampaignDateCallback = (startDate, endDate) => {
        const range =(moment(startDate).format('DD MMM YY')+' to '+moment(endDate).format('DD MMM YY')).toString();
        setFilterDateTitle(range)
    }

    return (
        <section className="all-campaigns-content">
            <div className="container">
                <div className="card campaigns-card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-md-6">
                                <h4>Go Checking OU</h4>
                                <ul className="campaigns-datas nav">
                                    <li>From 12th Jan 2020 - 18th Jan 2020</li>
                                    <li className="active-campaign">Active</li>
                                </ul>
                            </div>
                            <div className="col-md-6 text-right">
                                <DatePickerField applyCallback={AllCampaignDateCallback} label={filterDateTitle}/>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-8 pr-0 br">
                                <div className="campaigns-chart">
                                    <ul className="nav nav-pills nav-fill bb">
                                        <li className={"nav-item " + ((activeAttr === 'impressions') ? 'active' : '')} onClick={() => updateGraph('impressions')}>
                                            <div className="number">430,387</div>
                                            <div className="title">Impressions</div>
                                            <div className="percent up-percent">15%</div>
                                        </li>
                                        <li className={"nav-item " + ((activeAttr === 'clicks') ? 'active' : '')} onClick={() => updateGraph('clicks')}>
                                            <div className="number">320</div>
                                            <div className="title">Clicks</div>
                                            <div className="percent down-percent">15%</div>
                                        </li>
                                        <li className={"nav-item " + ((activeAttr === 'ctr') ? 'active' : '')} onClick={() => updateGraph('ctr')}>
                                            <div className="number">1.9%</div>
                                            <div className="title">CTR</div>
                                            <div className="percent down-percent">1.5%</div>
                                        </li>
                                        <li className={"nav-item " + ((activeAttr === 'conversion') ? 'active' : '')} onClick={() => updateGraph('conversion')}>
                                            <div className="number">862</div>
                                            <div className="title">Conversion</div>
                                            <div className="percent up-percent">15%</div>
                                        </li>
                                        <li className={"nav-item " + ((activeAttr === 'convrate') ? 'active' : '')} onClick={() => updateGraph('convrate')}>
                                            <div className="number">4.2%</div>
                                            <div className="title">Conv rate</div>
                                            <div className="percent up-percent">10%</div>
                                        </li>
                                    </ul>
                                    <div className="chart-block">
                                        <C3Chart size={size} data={data} bar={bar} axis={axis} unloadBeforeLoad={true} legend={legend} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="campiagns-info">
                                    <div className="campiagns-info-title bb">
                                        <h4>CAMPAIGN DETAILS</h4>
                                        <p>Based on campaigns performance</p>
                                    </div>
                                    <ul className="campiagns-info-data list-unstyled ">
                                        <li className="media bb">
                                            <span className="icon-box">
                                                <i className="icon-Objective"></i>
                                            </span>
                                            <div className="media-body">
                                                <div className="data">
                                                    <h5>Objective</h5>
                                                    <p>To increase online checking online account opening.</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="media bb">
                                            <span className="icon-box">
                                                <i className="icon-Shape"></i>
                                            </span>
                                            <div className="media-body">
                                                <div className="data">
                                                    <h5>Impression goal</h5>
                                                    <p>200,000 per month</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="media bb">
                                            <span className="icon-box">
                                                <i className="icon-KPI"></i>
                                            </span>
                                            <div className="media-body">
                                                <div className="data">
                                                    <h5>KPI</h5>
                                                    <p>Clicks, CTR, Conversion, Account opens</p>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className="text-right">
                                        <a href="#" className="btn-link">See Recommendation</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SingleCampaingsData;