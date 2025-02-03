var wcpsSliderDefaultData = {
	globalOptions: {
		viewType: "wcpsSlider",
		itemSource: "manual",
		search: true,
	},
	itemQueryArgs: [],
	styleObj: {},
	reponsiveCss: "",

	items: [
		{
			isActive: false,
			person: {
				name: "",
				avatar: { id: "", srcUrl: "" },
				jobTitle: "",
				company: { name: "", website: "", logoUrl: { id: "", srcUrl: "" } },
			},
			rating: 5,
			date: "11/01/2025",
			videoUrl: { type: "", link: "" },
			title: "What is Lorem Ipsum?",
			content:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
			tags: [],
		},
	],

	loopLayout: [],
	wrapper: {
		options: {
			content: "",
			tag: "div",
			class: "wcps-wrapper",
		},
		styles: {},
	},
	itemsWrap: {
		options: {
			class: "wcps-items",
		},
		styles: {},
	},
	itemWrap: {
		options: {
			class: "wcps-item",
		},
		styles: {},
	},
	navsWrap: {
		options: {
			class: "nav-wrap",
		},
		styles: {},
	},
	navItem: {
		options: {
			class: "nav-item",
		},
		styles: {},
	},


	prev: {
		options: {
			text: "Prev",
			class: "",
		},
		styles: {},
	},
	prevIcon: {
		options: {
			position: "before",
			class: "",
			library: "fontAwesome",
			srcType: "class",
			iconSrc: "fas fa-chevron-left",
		},
		styles: {},
	},
	next: {
		options: {
			text: "Next",
			class: "",
		},
		styles: {},
	},
	nextIcon: {
		options: {
			position: "after",
			class: "",
			library: "fontAwesome",
			srcType: "class",
			iconSrc: "fas fa-chevron-right",
		},
		styles: {},
	},
	paginationWrap: {
		options: {
			type: "",
			tag: "",
			class: "",
		},
		styles: {},
	},
	paginationItem: {
		options: {
			tag: "",
			class: "",
		},
		styles: {},
	},
	paginationItemActive: {
		options: {
			class: "",
		},
		styles: {},
	},
	sliderOptions: {
		perPage: "3",
		perMove: "1",
		autoplay: "1",
		gap: "1em",
		pagination: "1",
		drag: "1",
		arrows: "1",
		pauseOnHover: "1",
		speed: "400",
	},
	sliderOptionsRes: {},
};
export default wcpsSliderDefaultData;
