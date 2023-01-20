import colors from 'windicss/colors'

module.exports = {
	theme: {
		colors: {
			...colors,
			'primary': '#08EBFC',
			'secondary': '#9473F6',
			'grey-dark': '#2F2F2F',
			'black': '#000000',
			'white': '#ffffff'
		},
		extend: {
			backgroundImage: theme => ({
				'primary-gradient': 'linear-gradient(324.45deg, #08EBFC 15.19%, #08EBFC 22.49%, #08EBFC 38.72%, #7B52F6 91.6%, #7B52F6 92.26%);'
			})
		},
		fontFamily: {
      'display': ['Ailreons'],
      'sans-serif': ['Stratos']
    }
	},
	variants: {},
	plugins: [
		require('windicss/plugin/line-clamp')
	],
};
