import fetch from 'isomorphic-fetch';
import createProxyAgent from './create-proxy-agent';

export default (url, options = {}) => {
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
