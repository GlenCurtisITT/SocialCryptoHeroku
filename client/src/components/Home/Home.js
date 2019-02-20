import React, { Component } from 'react';
import { connect } from 'react-redux'
import { css } from '@emotion/core'
import PropTypes from 'prop-types';
import styles from './Home.css'
import {fetchTopCryptos} from '../../actions/home'
import ClipLoader from 'react-spinners/RingLoader'

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class Home extends Component {

    componentWillMount(){
        this.props.fetchTopCryptos();
    }

    render() {
        const coins = this.props.topCryptos;
        const isLoading = this.props.fetching;
        if(isLoading){
            return(
                <div className="row-lg-12">
                    <h4 className="text-center">Top 10 Cryptocurrencies by Market Capitalisation</h4>
                    <ClipLoader
                        css={override}
                        sizeUnit={"px"}
                        size={150}
                        color={'#000000'}
                        loading={isLoading}
                    />
                </div>
            )
        }

        return (
            <div className="row-lg-12">
                <h4 className="text-center">Top 10 Cryptocurrencies by Market Capitalisation</h4>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Total Vol (24hr)</th>
                        <th scope="col">Market Cap</th>
                        <th scope="col">Change (24hr)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {coins.map((coin, index) =>
                        <tr>
                            <th scope="row">{index + 1}</th>
                            <td><img className={styles.thumb} src={"https://www.cryptocompare.com" + coin.CoinInfo.ImageUrl} alt="" />{coin.CoinInfo.FullName} - {coin.CoinInfo.Name}</td>
                            <td>{coin.DISPLAY.USD.PRICE}</td>
                            <td>{coin.DISPLAY.USD.TOTALVOLUME24HTO}</td>
                            <td>{coin.DISPLAY.USD.MKTCAP}</td>
                            {coin.RAW.USD.CHANGEPCT24HOUR > 0 &&
                            <td className="text-success">{coin.RAW.USD.CHANGEPCT24HOUR}%</td>
                            }
                            {coin.RAW.USD.CHANGEPCT24HOUR < 0 &&
                            <td className="text-danger">{coin.RAW.USD.CHANGEPCT24HOUR}%</td>
                            }
                            {coin.RAW.USD.CHANGEPCT24HOUR === 0 &&
                            <td>{coin.RAW.USD.CHANGEPCT24HOUR}%</td>
                            }
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        )
    }
}

Home.propTypes = {
    fetchTopCryptos: PropTypes.func.isRequired,
    fetching: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    topCryptos: state.home.topCryptos,
    fetching: state.home.fetching
})

export default connect(mapStateToProps, {fetchTopCryptos})(Home)