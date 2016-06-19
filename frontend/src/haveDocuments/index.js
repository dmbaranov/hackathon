/* eslint-disable */
import React, { Component } from 'react'
import { Col } from 'react-bootstrap'
import { connect } from 'react-redux'

import './style.scss'

var jsonDataCook = [{"region":"Центральный федеральный округ","vacancies_in_region":45,"avarage_salary_in_region":17785,"avary_sallary_in_russia":20607,"total_vacancies_amount_in_russia":241},{"region":"Северо-Западный федеральный округ","vacancies_in_region":44,"avarage_salary_in_region":21967,"avary_sallary_in_russia":20607,"total_vacancies_amount_in_russia":241},{"region":"Южный федеральный округ","vacancies_in_region":17,"avarage_salary_in_region":16887,"avary_sallary_in_russia":20607,"total_vacancies_amount_in_russia":241},{"region":"Северо-Кавказский федеральный округ","vacancies_in_region":2,"avarage_salary_in_region":57000,"avary_sallary_in_russia":20607,"total_vacancies_amount_in_russia":241},{"region":"Приволжский федеральный округ","vacancies_in_region":12,"avarage_salary_in_region":13500,"avary_sallary_in_russia":20607,"total_vacancies_amount_in_russia":241},{"region":"Уральский федеральный округ","vacancies_in_region":12,"avarage_salary_in_region":27867,"avary_sallary_in_russia":20607,"total_vacancies_amount_in_russia":241},{"region":"Сибирский федеральный округ","vacancies_in_region":71,"avarage_salary_in_region":19101,"avary_sallary_in_russia":20607,"total_vacancies_amount_in_russia":241},{"region":"Дальневосточный федеральный округ","vacancies_in_region":34,"avarage_salary_in_region":26493,"avary_sallary_in_russia":20607,"total_vacancies_amount_in_russia":241},{"region":"Крымский федеральный округ","vacancies_in_region":6,"avarage_salary_in_region":13877,"avary_sallary_in_russia":20607,"total_vacancies_amount_in_russia":241},{"region":"г. Байконур","vacancies_in_region":0,"avarage_salary_in_region":0,"avary_sallary_in_russia":20607,"total_vacancies_amount_in_russia":241}];
var jsonDataElectrician = [{"region":"Центральный федеральный округ","vacancies_in_region":126.0,"avarage_salary_in_region":11510.0,"avary_sallary_in_russia":13167.0,"total_vacancies_amount_in_russia":192.0},{"region":"Северо-Западный федеральный округ","vacancies_in_region":21.0,"avarage_salary_in_region":16795.238095238095,"avary_sallary_in_russia":13167.0,"total_vacancies_amount_in_russia":192.0},{"region":"Южный федеральный округ","vacancies_in_region":19.0,"avarage_salary_in_region":15131.578947368422,"avary_sallary_in_russia":13167.0,"total_vacancies_amount_in_russia":192.0},{"region":"Северо-Кавказский федеральный округ","vacancies_in_region":0.0,"avarage_salary_in_region":0.0,"avary_sallary_in_russia":13167.0,"total_vacancies_amount_in_russia":192.0},{"region":"Приволжский федеральный округ","vacancies_in_region":1.0,"avarage_salary_in_region":10000.0,"avary_sallary_in_russia":13167.0,"total_vacancies_amount_in_russia":192.0},{"region":"Уральский федеральный округ","vacancies_in_region":0.0,"avarage_salary_in_region":0.0,"avary_sallary_in_russia":13167.0,"total_vacancies_amount_in_russia":192.0},{"region":"Сибирский федеральный округ","vacancies_in_region":0.0,"avarage_salary_in_region":0.0,"avary_sallary_in_russia":13167.0,"total_vacancies_amount_in_russia":192.0},{"region":"Дальневосточный федеральный округ","vacancies_in_region":22.0,"avarage_salary_in_region":18322.727272727272,"avary_sallary_in_russia":13167.0,"total_vacancies_amount_in_russia":192.0},{"region":"Крымский федеральный округ","vacancies_in_region":3.0,"avarage_salary_in_region":8136.0,"avary_sallary_in_russia":13167.0,"total_vacancies_amount_in_russia":192.0},{"region":"г. Байконур","vacancies_in_region":0.0,"avarage_salary_in_region":0.0,"avary_sallary_in_russia":13167.0,"total_vacancies_amount_in_russia":192.0}];
var jsonDataSailor = [{"region":"Центральный федеральный округ","vacancies_in_region":1242,"avarage_salary_in_region":14888,"avary_sallary_in_russia":16178,"total_vacancies_amount_in_russia":2041},{"region":"Северо-Западный федеральный округ","vacancies_in_region":78,"avarage_salary_in_region":12162.5,"avary_sallary_in_russia":16178,"total_vacancies_amount_in_russia":2041},{"region":"Южный федеральный округ","vacancies_in_region":152,"avarage_salary_in_region":11548,"avary_sallary_in_russia":16178,"total_vacancies_amount_in_russia":2041},{"region":"Северо-Кавказский федеральный округ","vacancies_in_region":0,"avarage_salary_in_region":0,"avary_sallary_in_russia":16178,"total_vacancies_amount_in_russia":2041},{"region":"Приволжский федеральный округ","vacancies_in_region":95,"avarage_salary_in_region":13751,"avary_sallary_in_russia":16178,"total_vacancies_amount_in_russia":2041},{"region":"Уральский федеральный округ","vacancies_in_region":10,"avarage_salary_in_region":25280,"avary_sallary_in_russia":16178,"total_vacancies_amount_in_russia":2041},{"region":"Сибирский федеральный округ","vacancies_in_region":77,"avarage_salary_in_region":13012.5,"avary_sallary_in_russia":16178,"total_vacancies_amount_in_russia":2041},{"region":"Дальневосточный федеральный округ","vacancies_in_region":349,"avarage_salary_in_region":25900,"avary_sallary_in_russia":16178,"total_vacancies_amount_in_russia":2041},{"region":"Крымский федеральный округ","vacancies_in_region":38,"avarage_salary_in_region":12835.5,"avary_sallary_in_russia":16178,"total_vacancies_amount_in_russia":2041},{"region":"г. Байконур","vacancies_in_region":0,"avarage_salary_in_region":0,"avary_sallary_in_russia":16178,"total_vacancies_amount_in_russia":2041}];
var jsonDataManipulator = [{"region":"Центральный федеральный округ","vacancies_in_region":0,"avarage_salary_in_region":0,"avary_sallary_in_russia":22268,"total_vacancies_amount_in_russia":172},{"region":"Северо-Западный федеральный округ","vacancies_in_region":6,"avarage_salary_in_region":26725.5,"avary_sallary_in_russia":22268,"total_vacancies_amount_in_russia":172},{"region":"Южный федеральный округ","vacancies_in_region":22,"avarage_salary_in_region":17227,"avary_sallary_in_russia":22268,"total_vacancies_amount_in_russia":172},{"region":"Северо-Кавказский федеральный округ","vacancies_in_region":0,"avarage_salary_in_region":0,"avary_sallary_in_russia":22268,"total_vacancies_amount_in_russia":172},{"region":"Приволжский федеральный округ","vacancies_in_region":13,"avarage_salary_in_region":16538,"avary_sallary_in_russia":22268,"total_vacancies_amount_in_russia":172},{"region":"Уральский федеральный округ","vacancies_in_region":4,"avarage_salary_in_region":22500,"avary_sallary_in_russia":22268,"total_vacancies_amount_in_russia":172},{"region":"Сибирский федеральный округ","vacancies_in_region":87,"avarage_salary_in_region":18308,"avary_sallary_in_russia":22268,"total_vacancies_amount_in_russia":172},{"region":"Дальневосточный федеральный округ","vacancies_in_region":40,"avarage_salary_in_region":24500,"avary_sallary_in_russia":22268,"total_vacancies_amount_in_russia":172},{"region":"Крымский федеральный округ","vacancies_in_region":0,"avarage_salary_in_region":6875,"avary_sallary_in_russia":22268,"total_vacancies_amount_in_russia":172},{"region":"г. Байконур","vacancies_in_region":0,"avarage_salary_in_region":0,"avary_sallary_in_russia":22268,"total_vacancies_amount_in_russia":172}];

export default class HaveDocuments extends Component {

	componentDidMount = () => {

		/*let jsonData;

		switch (this.props.sailor.specialization) {

			case "Вахтенный матрос":
				jsonData = jsonDataSailor;
				break;

			case "Судовой повар":
				jsonData = jsonDataCook;
				break;

			case "Вахтенный моторист":
				jsonData = jsonDataManipulator;
				break;

			case "Судовой электрик":
				jsonData = jsonDataElectrician;
				break;

			default:
				jsonData = [];
		}

		var labelsSalary = [], seriesSalary = [[]], labelVacancies = [], seriesVacancies = [[]];

		for (let i = 0; i < jsonData.length; i++) {
			labelsSalary.push(jsonData[i].region);
			seriesSalary[0].push(jsonData[i].avarage_salary_in_region);
			labelVacancies.push(jsonData[i].region);
			seriesVacancies[0].push(jsonData[i].vacancies_in_region);
		}

		var dataSalary = {
			labels: labelsSalary,
			series: seriesSalary
		};

		var dataVacancies = {
			labels: labelVacancies,
			series: seriesVacancies
		}

		new Chartist.Bar('#chartSalary', dataSalary);
		new Chartist.Bar('#chartVacancies', dataVacancies);*/

	}

    render = () => {

    	let classImg = 'have-documents__chart';

    	switch (this.props.sailor.specialization) {

    		case 'Вахтенный матрос':
    			classImg += ' sailor-img';
    			break;

    		case 'Судовой повар':
    			classImg +=' cook-img';
    			break;

    		case 'Вахтенный моторист':
    			classImg += ' motorist-img';
    			break;

    		case 'Судовой электрик':
    			classImg += ' electrician-img'
    			break;

    		default:
    			classImg += ' none-img';
    	}

        return (
            <Col componentClass="div" xs={ 12 } className="have-documents">
				{/*<Col componentClass="div" xs={ 12 } className="have-documents__chart">
					<div className="chart__title">Средние зарплаты</div>
					<div id="chartSalary" className="chart__chart"></div>
				</Col>
				<Col componentClass="div" xs={ 12 } className="have-documents__chart">
					<div className="chart__title">Количество вакансий</div>
					<div id="chartVacancies"></div>
				</Col>*/}
				<div className={ classImg }/>
            </Col>
        )
    };

}

function mapStateToProps(state) {
    return {
        sailor: state.sailor
    }
}

export default connect(mapStateToProps)(HaveDocuments);