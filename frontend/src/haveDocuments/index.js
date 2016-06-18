/* eslint-disable */
import React, { Component } from 'react'
import { Col } from 'react-bootstrap'
import $ from 'jquery'

import './style.scss'

var jsonData = [{"region":"Центральный федеральный округ","vacancies_in_region":45,"avarage_salary_in_region":17785,"avary_sallary_in_russia":20607,"total_vacancies_amount_in_russia":241},{"region":"Северо-Западный федеральный округ","vacancies_in_region":44,"avarage_salary_in_region":21967,"avary_sallary_in_russia":20607,"total_vacancies_amount_in_russia":241},{"region":"Южный федеральный округ","vacancies_in_region":17,"avarage_salary_in_region":16887,"avary_sallary_in_russia":20607,"total_vacancies_amount_in_russia":241},{"region":"Северо-Кавказский федеральный округ","vacancies_in_region":2,"avarage_salary_in_region":57000,"avary_sallary_in_russia":20607,"total_vacancies_amount_in_russia":241},{"region":"Приволжский федеральный округ","vacancies_in_region":12,"avarage_salary_in_region":13500,"avary_sallary_in_russia":20607,"total_vacancies_amount_in_russia":241},{"region":"Уральский федеральный округ","vacancies_in_region":12,"avarage_salary_in_region":27867,"avary_sallary_in_russia":20607,"total_vacancies_amount_in_russia":241},{"region":"Сибирский федеральный округ","vacancies_in_region":71,"avarage_salary_in_region":19101,"avary_sallary_in_russia":20607,"total_vacancies_amount_in_russia":241},{"region":"Дальневосточный федеральный округ","vacancies_in_region":34,"avarage_salary_in_region":26493,"avary_sallary_in_russia":20607,"total_vacancies_amount_in_russia":241},{"region":"Крымский федеральный округ","vacancies_in_region":6,"avarage_salary_in_region":13877,"avary_sallary_in_russia":20607,"total_vacancies_amount_in_russia":241},{"region":"г. Байконур","vacancies_in_region":0,"avarage_salary_in_region":0,"avary_sallary_in_russia":20607,"total_vacancies_amount_in_russia":241}];

export default class HaveDocuments extends Component {

	componentDidMount = () => {

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
		new Chartist.Bar('#chartVacancies', dataVacancies);

	}

    render = () => {

        return (
            <Col componentClass="div" xs={ 12 } className="have-documents">
				<Col componentClass="div" xs={ 12 } className="have-documents__chart">
					<div className="chart__title">Средние зарплаты</div>
					<div id="chartSalary" className="chart__chart"></div>
				</Col>
				<Col componentClass="div" xs={ 12 } className="have-documents__chart">
					<div className="chart__title">Количество вакансий</div>
					<div id="chartVacancies"></div>
				</Col>
            </Col>
        )
    };

}