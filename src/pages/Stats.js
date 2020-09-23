import React, { Fragment } from 'react';

/** Components */
import HeaderMain from '../components/HeaderMain';
import Footer from '../components/Footer';
import PageTitleWithFilter from '../components/PageTitleWithFilter';

const Stats = () => {
    return (
        <Fragment>
            <HeaderMain />
            <div className="main-container">
                <PageTitleWithFilter/>
                <section className="campaigns-charts">
                    <div className="container">
                        <div className="row bar-donut-charts mb-5">
                            <div className="col-sm-8">
                                <div className="card card-chart card-bar-chart">
                                    <div className="card-body">
                                        <h4>Age data</h4>
                                        <div className="chart-block">
                                            <img src="./assets/images/bar-graph.png" alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="card card-chart card-donut-chart">
                                    <div className="card-body">
                                        <h4>Gender data</h4>
                                        <div className="chart-block">
                                            <img src="./assets/images/donut-graph.png" alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row progress-chart">
                            <div className="col-sm-6">
                                <div className="card card-chart card-progress-chart">
                                    <div className="card-body">
                                        <h4>Affinity data</h4>
                                        <ul className="progress-chart-block">
                                            <li className="progressbar-item">
                                                <div className="progressbar-data">10.24%</div>
                                                <div className="progressbar-graph">
                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar" style={{width: '100%'}}></div>
                                                    </div>
                                                </div>
                                                <div className="progressbar-label">Sports & Fitness/Sports Fans</div>
                                            </li>
                                            <li className="progressbar-item">
                                                <div className="progressbar-data">7.24%</div>
                                                <div className="progressbar-graph">
                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar" style={{width: '80%'}}></div>
                                                    </div>
                                                </div>
                                                <div className="progressbar-label">Media & Entertainment/Movie Lovers</div>
                                            </li>
                                            <li className="progressbar-item">
                                                <div className="progressbar-data">7.9%</div>
                                                <div className="progressbar-graph">
                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar" style={{width: '75%'}}></div>
                                                    </div>
                                                </div>
                                                <div className="progressbar-label">Technology/Technophiles</div>
                                            </li>
                                            <li className="progressbar-item">
                                                <div className="progressbar-data">6.1%</div>
                                                <div className="progressbar-graph">
                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar" style={{width: '100%'}}></div>
                                                    </div>
                                                </div>
                                                <div className="progressbar-label">Sports/Fitness/Health & Fitness Buffs
                                                </div>
                                            </li>
                                            <li className="progressbar-item">
                                                <div className="progressbar-data">10.24%</div>
                                                <div className="progressbar-graph">
                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar" style={{width: '100%'}}></div>
                                                    </div>
                                                </div>
                                                <div className="progressbar-label">Shoppers/Luxury Shoppers</div>
                                            </li>
                                            <li className="progressbar-item">
                                                <div className="progressbar-data">10.24%</div>
                                                <div className="progressbar-graph">
                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar" style={{width: '100%'}}></div>
                                                    </div>
                                                </div>
                                                <div className="progressbar-label">Media & Entertainment/Movie</div>
                                            </li>
                                            <li className="progressbar-item">
                                                <div className="progressbar-data">10.24%</div>
                                                <div className="progressbar-graph">
                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar" style={{width: '100%'}}></div>
                                                    </div>
                                                </div>
                                                <div className="progressbar-label">Lifestyles & Hobbies/Green Living </div>
                                            </li>
                                            <li className="progressbar-item">
                                                <div className="progressbar-data">10.24%</div>
                                                <div className="progressbar-graph">
                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar" style={{width: '100%'}}></div>
                                                    </div>
                                                </div>
                                                <div className="progressbar-label">Shoppers/Luxury Shoppers</div>
                                            </li>
                                            <li className="progressbar-item">
                                                <div className="progressbar-data">10.24%</div>
                                                <div className="progressbar-graph">
                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar" style={{width: '100%'}}></div>
                                                    </div>
                                                </div>
                                                <div className="progressbar-label">Hobbies/Fashionistas</div>
                                            </li>
                                            <li className="progressbar-item">
                                                <div className="progressbar-data">10.24%</div>
                                                <div className="progressbar-graph">
                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar" style={{width: '100%'}}></div>
                                                    </div>
                                                </div>
                                                <div className="progressbar-label">Sports/Fitness/Health & Fitness Buffs
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="card card-chart card-progress-chart">
                                    <div className="card-body">
                                        <h4>In market data</h4>
                                        <ul className="progress-chart-block">
                                            <li className="progressbar-item">
                                                <div className="progressbar-data">10.24%</div>
                                                <div className="progressbar-graph">
                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar" style={{width: '100%'}}></div>
                                                    </div>
                                                </div>
                                                <div className="progressbar-label">Sports & Fitness/Sports Fans</div>
                                            </li>
                                            <li className="progressbar-item">
                                                <div className="progressbar-data">7.24%</div>
                                                <div className="progressbar-graph">
                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar" style={{width: '80%'}}></div>
                                                    </div>
                                                </div>
                                                <div className="progressbar-label">Media & Entertainment/Movie Lovers</div>
                                            </li>
                                            <li className="progressbar-item">
                                                <div className="progressbar-data">7.9%</div>
                                                <div className="progressbar-graph">
                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar" style={{width: '75%'}}></div>
                                                    </div>
                                                </div>
                                                <div className="progressbar-label">Technology/Technophiles</div>
                                            </li>
                                            <li className="progressbar-item">
                                                <div className="progressbar-data">6.1%</div>
                                                <div className="progressbar-graph">
                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar" style={{width: '100%'}}></div>
                                                    </div>
                                                </div>
                                                <div className="progressbar-label">Sports/Fitness/Health & Fitness Buffs
                                                </div>
                                            </li>
                                            <li className="progressbar-item">
                                                <div className="progressbar-data">10.24%</div>
                                                <div className="progressbar-graph">
                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar" style={{width: '100%'}}></div>
                                                    </div>
                                                </div>
                                                <div className="progressbar-label">Shoppers/Luxury Shoppers</div>
                                            </li>
                                            <li className="progressbar-item">
                                                <div className="progressbar-data">10.24%</div>
                                                <div className="progressbar-graph">
                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar" style={{width: '100%'}}></div>
                                                    </div>
                                                </div>
                                                <div className="progressbar-label">Media & Entertainment/Movie</div>
                                            </li>
                                            <li className="progressbar-item">
                                                <div className="progressbar-data">10.24%</div>
                                                <div className="progressbar-graph">
                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar" style={{width: '100%'}}></div>
                                                    </div>
                                                </div>
                                                <div className="progressbar-label">Lifestyles & Hobbies/Green Living </div>
                                            </li>
                                            <li className="progressbar-item">
                                                <div className="progressbar-data">10.24%</div>
                                                <div className="progressbar-graph">
                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar" style={{width: '100%'}}></div>
                                                    </div>
                                                </div>
                                                <div className="progressbar-label">Shoppers/Luxury Shoppers</div>
                                            </li>
                                            <li className="progressbar-item">
                                                <div className="progressbar-data">10.24%</div>
                                                <div className="progressbar-graph">
                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar" style={{width: '100%'}}></div>
                                                    </div>
                                                </div>
                                                <div className="progressbar-label">Hobbies/Fashionistas</div>
                                            </li>
                                            <li className="progressbar-item">
                                                <div className="progressbar-data">10.24%</div>
                                                <div className="progressbar-graph">
                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar" style={{width: '100%'}}></div>
                                                    </div>
                                                </div>
                                                <div className="progressbar-label">Sports/Fitness/Health & Fitness Buffs
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </div>
            <Footer />
        </Fragment>
    );
};

export default Stats;