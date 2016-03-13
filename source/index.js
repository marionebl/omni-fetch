import fetch from 'isomorphic-fetch';
import createProxyAgent from './create-proxy-agent';

const omniFetch = (url, options = {}) => {
	// Respect explicitly passed agents
	if (options.agent) {
		return fetch(url, options);
	}

	// Get proxy agent depending on url and env configuration
	const agent = createProxyAgent(url);
	const amendment = agent ? {agent} : {};

	// Inject agent option if applicable
	return fetch(url, {
		...options,
		...amendment
	});
};

// Be nice to typescript consumers
omniFetch.default = omniFetch;
export default omniFetch;
