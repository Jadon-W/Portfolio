const languages = [
    {
        value: 'javascript',
        label: 'JavaScript',
        syntaxTheme: 'vs-dark',
        documentation: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
        settings: {
            tabSize: 2,
            insertSpaces: true
        }
    },
    {
        value: 'python',
        label: 'Python',
        syntaxTheme: 'vs-dark',
        documentation: 'https://docs.python.org/3/',
        settings: {
            tabSize: 4,
            insertSpaces: true
        }
    },
    {
        value: 'java',
        label: 'Java',
        syntaxTheme: 'vs-dark',
        documentation: 'https://docs.oracle.com/javase/8/docs/',
        settings: {
            tabSize: 4,
            insertSpaces: true
        }
    },
    {
        value: 'cpp',
        label: 'C++',
        syntaxTheme: 'vs-dark',
        documentation: 'https://en.cppreference.com/w/',
        settings: {
            tabSize: 4,
            insertSpaces: true
        }
    },
    {
        value: 'ruby',
        label: 'Ruby',
        syntaxTheme: 'vs-dark',
        documentation: 'https://www.ruby-lang.org/en/documentation/',
        settings: {
            tabSize: 2,
            insertSpaces: true
        }
    }
];

export const getLanguageSettings = (language) => {
    const lang = languages.find(lang => lang.value === language);
    return lang ? lang.settings : null;
};

export const getLanguageTheme = (language) => {
    const lang = languages.find(lang => lang.value === language);
    return lang ? lang.syntaxTheme : 'vs-dark';
};

export const getDocumentationLink = (language) => {
    const lang = languages.find(lang => lang.value === language);
    return lang ? lang.documentation : '#';
};

export default languages;