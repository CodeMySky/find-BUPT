// -------------------------------------------------------------------
// markItUp!
// -------------------------------------------------------------------
// Copyright (C) 2008 Jay Salvat
// http://markitup.jaysalvat.com/
// -------------------------------------------------------------------
// MarkDown tags example
// http://en.wikipedia.org/wiki/Markdown
// http://daringfireball.net/projects/markdown/
// -------------------------------------------------------------------
// Feel free to add more tags
// -------------------------------------------------------------------
mySettings = {
	previewParserPath:	'',
	onShiftEnter:		{keepDefault:false, openWith:'\n\n'},
	markupSet: [
		{name:'H1', key:'1', placeHolder:'Your title here...', 
			closeWith:function(markItUp) { return miu.markdownTitle(markItUp, '=') }},
		{name:'H2', key:'2', placeHolder:'Your title here...', 
			closeWith:function(markItUp) { return miu.markdownTitle(markItUp, '-') }},
		{name:'H3', key:'3', openWith:'### ', placeHolder:'Your title here...'},
		{name:'H4', key:'4', openWith:'#### ', placeHolder:'Your title here...'},
		{name:'H5', key:'5', openWith:'##### ', placeHolder:'Your title here...'},
		{name:'H6', key:'6', openWith:'###### ', placeHolder:'Your title here...'},
		//{separator:'---------------' },		
		{name:'B', key:'B', openWith:'**', closeWith:'**'},
		{name:'I', key:'I', openWith:'_', closeWith:'_'},
		//{separator:'---------------' },
		{name:'Bulleted List', openWith:'- ' },
		{name:'Numeric List', openWith:function(markItUp) {
			return markItUp.line+'. ';
		}},
		//{separator:'---------------' },
		{name:'Picture', key:'P', replaceWith:'![[![Alternative text]!]]([![Url:!:http://]!] "[![Title]!]")'},
		{name:'Link', key:'L', openWith:'[', closeWith:']([![Url:!:http://]!] "[![Title]!]")', placeHolder:'Your text to link here...'},
		//{separator:'---------------'},	
		{name:'Quotes', openWith:'> '},
		//{separator:'---------------'},
		{name:'Preview', call:'preview'}
	]
}

// mIu nameSpace to avoid conflict.
miu = {
	markdownTitle: function(markItUp, char) {
		heading = '';
		n = $.trim(markItUp.selection||markItUp.placeHolder).length;
		for(i = 0; i < n; i++) {
			heading += char;
		}
		return '\n'+heading;
	}
}
