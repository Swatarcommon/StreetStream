import React, {Component} from 'react';

export default class FetchData extends Component {
    static displayName = FetchData.name;

    componentWillMount() {
        this.loadForecasts();
    }

    static renderForecastsTable(forecasts) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
                </thead>
                <tbody>
                {forecasts.map(forecast =>
                    <tr key={forecast.date}>
                        <td>{forecast.date}</td>
                        <td>{forecast.temperatureC}</td>
                        <td>{forecast.temperatureF}</td>
                        <td>{forecast.summary}</td>
                    </tr>
                )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.props.loading
            ? <p><em>Loading...</em></p>
            : FetchData.renderForecastsTable(this.props.forecasts);

        return (
            <div>
                <h1 id="tabelLabel">Weather forecast</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }

    async loadForecasts() {
        this.props.fetchForecast();
    }
}