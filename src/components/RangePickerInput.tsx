import React, { useState, useRef } from 'react';

import RangePicker from "./RangePicker";
import { RangePickerInputProps } from '../interfaces/rangepicker.interfaces';
import { getInitialDateForInput } from '../utils/datetimepicker.utils';

import { useOutsideAlerter } from '../utils/useOutsideAlerter.hook'

import styles from "../styles/rangepicker.css";
import rootstyles from "../styles/root.css";


const RangePickerInput = (props: RangePickerInputProps) => {
	const wrapperRef = useRef(null);

	const [show_picker, setShow] = useState(false)

	useOutsideAlerter(wrapperRef, setShow);


	const from_date_str = getInitialDateForInput(props.from_date, props.format)
	const to_date_str = getInitialDateForInput(props.to_date, props.format)
	const show_date = `${from_date_str} To ${to_date_str}`
	const {colors} = props

	return (
		<div ref={wrapperRef} className={[styles.picker_input_wrapper, props.className].join(' ')} >
			<input value={show_date} className={styles.picker_input} 
				readOnly disabled={props.isDisabled}
				style={{...props.inputStyle}}
				onFocus={() => setShow(true)} />

			{(show_picker && !props.isDisabled) &&
				<div className={[rootstyles.picker_model, props.popupClassName].join(' ')}
					style={props.popupStyle} >
						<div className={rootstyles.picker_model_inside} >
							<RangePicker from_date={props.from_date} to_date={props.to_date}
								format={props.format} timeFormat={props.timeFormat} dateFormat={props.dateFormat}
								weekStartsOn={props.weekStartsOn}
								closeButtonText={props.closeButtonText}
								onFromDateUpdate={props.onFromDateUpdate} onFromTimeUpdate={props.onFromTimeUpdate}
								onFromDateTimeUpdate={props.onFromDateTimeUpdate}
								onToDateUpdate={props.onToDateUpdate} onToTimeUpdate={props.onToTimeUpdate}
								onToDateTimeUpdate={props.onToDateTimeUpdate}
								onDone={() => setShow(false)} colors={colors} />
						</div>
				</div>
			}
		</div>
	)
}

RangePickerInput.defaultProps = {
	closeButtonText: 'Done',
	isDisabled: false
}


export default RangePickerInput