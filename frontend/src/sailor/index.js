/* eslint-disable */
import $ from 'jquery'
import React, { Component } from 'react'
import { Col, Panel, Accordion, Button } from 'react-bootstrap'
import { browserHistory } from 'react-router'

import './style.scss'

var courses = [{"id":1,"title":"Профессиональная подготовка по профессии ”Вахтерный матрос”","studying_time":908,"price_for_cource":20000},{"id":2,"title":"Профессиональная подготовка по профессии “Судовой повар”","studying_time":840,"price_for_cource":20000},{"id":3,"title":"Профессиональная подготовка по профессии ”Вахтерный моторист”","studying_time":784,"price_for_cource":20000},{"id":4,"title":"Профессиональная подготовка по профессии “Судовой электрик”","studying_time":1032,"price_for_cource":40000},{"id":5,"title":"Курс “Начальная подготовка по безопасности”","studying_time":64,"price_for_cource":8000},{"id":6,"title":"Курс “Подготовка по охране” ","studying_time":16,"price_for_cource":4000}];
var professions = [{"title":"Вахтерный матрос","certificate_of_education":"свидетельство о прохождении в морском образовательном учреждении подготовки по программе \"вахтренный матрос\"","certificate_of_experience":"справки о плавании с выполнением обязанностей по несению вахты на ходовом мостике под наблюдением дипломированного специалиста не менее двух месяцев","сertificate_of_security_preparations":"свидетельство, выданное УТЦ, о начальной подготовке по безопасности в соответствии с Правилом VI/1 Конвенции ПДНВ по согласованной Росморречфлотом программе","certificate_of_protection":"свидетельство, выданное УТЦ, о подготовке по охране в соответствии с Правилом VI/6 Конвенции ПДНВ по согласованной Росморречфлотом программе","courses_ids":"1,5,6"},{"title":"Судовой повар","certificate_of_education":"свидетельство о подготовке или переподготовке по программе \"повар судовой\"","certificate_of_experience":"справки о плавании на судах в должности помощника (дублера, практиканта) судового повара в течение одного месяца за последние три года","сertificate_of_security_preparations":"свидетельство, выданное УТЦ, о начальной подготовке по безопасности в соответствии с Правилом VI/1 Конвенции ПДНВ по согласованной Росморречфлотом программе","certificate_of_protection":"свидетельство, выданное УТЦ, о подготовке по охране в соответствии с Правилом VI/6 Конвенции ПДНВ по согласованной Росморречфлотом программе","courses_ids":"2,5,6"},{"title":"Вахтернный моторист","certificate_of_education":"свидетельство о подготовке в морском образовательном учреждении по программе \"вахтенный моторист\" или документ о получении высшего или среднего профессионального образования в области эксплуатации главной двигательной установки в морском образовательном учреждении","certificate_of_experience":"справки о плавании с выполнением обязанностей по несению вахты в машинном отделении под наблюдением дипломированного специалиста не менее двух месяцев","сertificate_of_security_preparations":"свидетельство, выданное УТЦ, о начальной подготовке по безопасности в соответствии с Правилом VI/1 Конвенции ПДНВ по согласованной Росморречфлотом программе","certificate_of_protection":"свидетельство, выданное УТЦ, о подготовке по охране в соответствии с Правилом VI/6 Конвенции ПДНВ по согласованной Росморречфлотом программе","courses_ids":"3,5,6"},{"title":"Судовой электрик","certificate_of_education":"свидетельство о подготовке в морском образовательном учреждении по программе \"судовой электрик\", или документ о получении высшего или среднего профессионального образования в области эксплуатации судового электрооборудования и автоматики в морском образовательном учреждении","certificate_of_experience":"справки о плавании с выполнением обязанностей по обслуживанию судового электрооборудования под наблюдением дипломированного специалиста не менее шести месяцев","сertificate_of_security_preparations":"свидетельство, выданное УТЦ, о начальной подготовке по безопасности в соответствии с Правилом VI/1 Конвенции ПДНВ по согласованной Росморречфлотом программе","certificate_of_protection":"свидетельство, выданное УТЦ, о подготовке по охране в соответствии с Правилом VI/6 Конвенции ПДНВ по согласованной Росморречфлотом программе","courses_ids":"4,5,6"}];

export default class Sailor extends Component {

	onButtonHaveClick = () => {
		browserHistory.push('/with-documents');
	}

	onButtonNoClick = () => {
		browserHistory.push('/no-documents');
	}

    render = () => {

    	let profs = professions.map((item, number) => {
    		return (
    			<Panel key={ number } header={ item.title } eventKey={number} className="sailor__profession-panel">
    				{/*<div className="professional-panel__document"><span className="professional-panel__document-title">Свидетельство об образовании:</span> { item.certificate_of_education }</div>
    				<div className="professional-panel__document"><span className="professional-panel__document-title">Свидетельство об опыте:</span> { item.certificate_of_experience }</div>
    				<div className="professional-panel__document"><span className="professional-panel__document-title">Курсы по технике безопасности:</span> { item.сertificate_of_security_preparations }</div>
    				<div className="professional-panel__document"><span className="professional-panel__document-title">Курсы по охране:</span> { item.certificate_of_protection }</div>*/}
    				<ul className="professional-panel__documents">
    					<li>{ item.certificate_of_education }</li>
    					<li>{ item.certificate_of_experience }</li>
    					<li>{ item.сertificate_of_security_preparations }</li>
    					<li>{ item.certificate_of_protection }</li>
    				</ul>
    				<div className="professional-panel__buttons">
	    				<Button bsStyle="success" onClick={ this.onButtonHaveClick }>У меня есть эти документы</Button>
	    				<Button bsStyle="danger" onClick={ this.onButtonNoClick }>У меня нет этих документов</Button>
    				</div>
    			</Panel>
    		)
    	});


        return (
            <Col componentClass="div" xs={ 12 } className="wrong-profession">
	            <Accordion>
	            	{ profs }
	                {/*<Panel header="Высшая профессия" eventKey="1">
						<div>Срок обучения: </div>
	                    <div>Стоимость обучения: </div>
	                    <div>Список вузов: </div>
	                    <div>Тут будет круговая диаграмма с регионами и процентами актуальности регионов</div> 
	                </Panel>
	                <Panel header="Высокая профессия" eventKey="2">
						<div>Срок обучения: </div>
	                    <div>Стоимость обучения: </div>
	                    <div>Список вузов: </div>
	                    <div>Тут будет круговая диаграмма с регионами и процентами актуальности регионов</div>
	                </Panel>
	                <Panel header="Средняя профессия" eventKey="3">
						<div>Срок обучения: </div>
	                    <div>Стоимость обучения: </div>
	                    <div>Список вузов: </div>
	                    <div>Тут будет круговая диаграмма с регионами и процентами актуальности регионов</div>
	                </Panel>
	                <Panel header="Низшая профессия" eventKey="4">
						<div>Срок обучения: </div>
	                    <div>Стоимость обучения: </div>
	                    <div>Список вузов: </div>
	                    <div>Тут будет круговая диаграмма с регионами и процентами актуальности регионов</div>
	                </Panel>*/}
	            </Accordion>
            </Col>
        )
    };

}