const { Component, RawHTML } = wp.element;
import { __ } from "@wordpress/i18n";
import { Button, Dropdown, ToggleControl } from "@wordpress/components";
import { useState } from "@wordpress/element";
function Html(props) {
	if (!props.warn) {
		return null;
	}
	var args = {
		stretch: { label: "stretch", value: "stretch" },
		center: { label: "center", value: "center" },
		"self-end": { label: "self end	", value: "self-start" },
		"self-start": { label: "self start	", value: "self-start" },
		"flex-start": { label: "flex start	", value: "flex-start" },
		"flex-end": { label: "flex end	", value: "flex-end" },
		"space-between": { label: "space between", value: "space-between" },
		"space-around": { label: "space around", value: "space-around" },
		"space-evenly": { label: "space evenly", value: "space-evenly" },
		right: { label: "right", value: "right" },
		left: { label: "left", value: "left" },
		start: { label: "start", value: "start" },
		end: { label: "end", value: "end" },
		normal: { label: "normal", value: "normal" },
		start: { label: "start", value: "start" },
		baseline: { label: "baseline", value: "baseline" },
		revert: { label: "revert", value: "revert" },
		unset: { label: "unset", value: "unset" },
		inherit: { label: "inherit", value: "inherit" },
		initial: { label: "initial", value: "initial" },
	};
	const [valArgs, setValArgs] = useState(props.val.split(" "));
	const [align, setalign] = useState(valArgs[0]);
	const [isImportant, setImportant] = useState(
		valArgs[1] == undefined ? false : true
	);
	return (
		<div className="flex justify-between items-center">
			<Dropdown
				position="bottom"
				renderToggle={({ isOpen, onToggle }) => (
					<Button
						title={__("Place Items", "post-grid")}
						onClick={onToggle}
						aria-expanded={isOpen}>
						{/* <div className=" ">{props.val ? args[props.val].label : 'Select...'}</div> */}
						<div className=" ">
							{args[align] == undefined
								? __("Select...", "post-grid")
								: args[align].label}
						</div>
						{/* <div className=" ">{val ? val : 'Select...'}</div> */}
					</Button>
				)}
				renderContent={() => (
					<div className="w-32">
						{Object.entries(args).map((args) => {
							var index = args[0];
							var x = args[1];
							return (
								<div
									className={
										"px-3 py-1 border-b block hover:bg-gray-400 cursor-pointer"
									}
									onClick={(ev) => {
										// props.onChange(x.value, 'alignItems');
										setalign(x.value);
										if (isImportant) {
											props.onChange(x.value + " !important", "placeItems");
										} else {
											props.onChange(x.value, "placeItems");
										}
									}}>
									{!x.value && <div>{__("Reset", "post-grid")}</div>}
									{x.value && <>{x.label}</>}
								</div>
							);
						})}
					</div>
				)}
			/>
			<ToggleControl
				help={
					isImportant
						? __("Important (Enabled)", "post-grid")
						: __("Important?", "post-grid")
				}
				checked={isImportant}
				onChange={(arg) => {
					setImportant((isImportant) => !isImportant);
					if (isImportant) {
						props.onChange(align, "placeItems");
					} else {
						props.onChange(align + " !important", "placeItems");
					}
				}}
			/>
		</div>
	);
}
class PGcssPlaceItems extends Component {
	constructor(props) {
		super(props);
		this.state = { showWarning: true };
		this.handleToggleClick = this.handleToggleClick.bind(this);
	}
	handleToggleClick() {
		this.setState((state) => ({
			showWarning: !state.showWarning,
		}));
	}
	render() {
		const { val, onChange } = this.props;
		return <Html val={val} onChange={onChange} warn={this.state.showWarning} />;
	}
}
export default PGcssPlaceItems;
