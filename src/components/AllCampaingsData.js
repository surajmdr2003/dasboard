import React, { useState, useEffect } from 'react';
import C3Chart from '@kaiouwang/react-c3js';
import 'c3/c3.css';
import moment from 'moment';
import GraphData from './GraphData';
import DatePickerField from './form-fields/DatePickerField';
import { Link } from 'react-router-dom';

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


const AllCampaingsData = () => {
    const [data, setData] = useState(initialData); // For graph data
    const [activeAttr, setActive] = useState('impressions'); // For active graph (tab)
    const [filterDateTitle, setFilterDateTitle] = useState('Last 7 Days'); // For datepicker label
    const [showRecommendation, setRecommendation] = useState(false) // For recommendation message

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
                                <h4>All Campaigns data</h4>
                                <ul className="campaigns-datas nav">
                                    <li>12 total campaigns</li>
                                    <li className="active-campaign">5 Active</li>
                                    <li className="inactive-campaign">3 Inactive</li>
                                    <li className="paused-campaign">4 Paused</li>
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
                                <div className={"campiagns-info " + ((!showRecommendation) ? '' : 'd-none')}>
                                    <div className="campiagns-info-title bb">
                                        <h4>Lifetime Data</h4>
                                        <p>Based on campaigns performance</p>
                                    </div>
                                    <ul className="campiagns-info-data list-unstyled ">
                                        <li className="media bb">
                                            <span className="icon-box">
                                                <i className="icon-campaign"></i>
                                            </span>
                                            <div className="media-body">
                                                <div className="data">
                                                    <h5>Impressions</h5>
                                                    <p>980,000</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="media bb">
                                            <span className="icon-box">
                                                <i className="icon-click"></i>
                                            </span>
                                            <div className="media-body">
                                                <ul className="nav nav-fill">
                                                    <li className="nav-item">
                                                        <div className="data">
                                                            <h5>Clicks</h5>
                                                            <p>980</p>
                                                        </div>
                                                    </li>
                                                    <li className="nav-item">
                                                        <div className="data">
                                                            <h5>CTR</h5>
                                                            <p>2%</p>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li className="media bb">
                                            <span className="icon-box">
                                                <i className="icon-conversion"></i>
                                            </span>
                                            <div className="media-body">
                                                <ul className="nav nav-fill">
                                                    <li className="nav-item">
                                                        <div className="data">
                                                            <h5>Conversion</h5>
                                                            <p>980,000</p>
                                                        </div>
                                                    </li>
                                                    <li className="nav-item">
                                                        <div className="data">
                                                            <h5>Con rate</h5>
                                                            <p>9%</p>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className="text-right">
                                        <Link to="#" className="btn-link" onClick={() => setRecommendation(!showRecommendation)}>See Recommendation</Link>
                                    </div>
                                </div>
                                <div className={"campiagns-info recommendation " + ((showRecommendation) ? '' : 'd-none')} >
                                    <div className="campiagns-info-title bb">
                                        <h4>RECOMMENDATIONS</h4>
                                        <p>Based on your campaign performance</p>
                                    </div>
                                    <div className="campiagns-info-data">
                                        <h5>Add responsive display ads</h5>
                                        <p>Get more conversion at a similar CPA with responsive display ads, which automatically adapt to fit all devices</p>
                                    </div>
                                    <div className="text-left">
                                        <Link to="#" className="btn-link" onClick={() => setRecommendation(!showRecommendation)}>Notify Sales</Link>
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

export default AllCampaingsData;