import {parse} from 'url';
import caw from 'caw';
import fetch from 'isomorphic-fetch';

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

/**
 * Obtain a suitable proxy agent depending on environemt variables and url
 * @param {string} url to get a suitable agent for
 * @type {Object|null} agent suitable for application of current proxy settings,
 * null if no proxy settings were given for the current protocol
 */
function createProxyAgent(url) {
	// Determine environemt variable names to search for
	const {protocol} = parse(url);
	const protocolName = protocol.replace(':', '');
	const envNames = [
		`${protocolName}_proxy`,
		`${protocolName}_proxy`.toUpperCase()
	];

	// Check if proxy is configured for current url protocol
	const enabled = envNames.find(envName => process.env[envName]);

	// Return suitable proxy agent, null of none configured
	return enabled ? caw({protocol: protocolName}) : null;
}
