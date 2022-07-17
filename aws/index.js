const dns = require('dns').promises;

function myDnsRequest(inputDnsServer, inputFqdn, inputRecordType) {
    if (inputDnsServer != "default") {
        dns.setServers([inputDnsServer]);
    }
    return dns.resolve(inputFqdn, inputRecordType).catch((error) => {
        if (error?.code === 'ENODATA') {
            return ["Error: DNS server returned answer with no data."];
        } else if (error?.code === 'EFORMERR') {
            return ["Error: DNS server claims query was misformatted."];
        } else if (error?.code === 'ESERVFAIL') {
            return ["Error: DNS server returned general failure."];
        } else if (error?.code === 'ENOTFOUND') {
            return ["Error: Domain name not found."];
        } else if (error?.code === 'ENOTIMP') {
            return ["Error: DNS server does not implement requested operation."];
        } else if (error?.code === 'EREFUSED') {
            return ["Error: DNS server refused query."];
        } else if (error?.code === 'EBADQUERY') {
            return ["Error: Misformatted DNS query."];
        } else if (error?.code === 'EBADNAME') {
            return ["Error: Misformatted host name."];
        } else if (error?.code === 'EBADFAMILY') {
            return ["Error: Unsupported address family."];
        } else if (error?.code === 'EBADRESP') {
            return ["Error: Misformatted DNS reply."];
        } else if (error?.code === 'ECONNREFUSED') {
            return ["Error: Could not contact DNS servers."];
        } else if (error?.code === 'ETIMEOUT') {
            return ["Error: Timeout while contacting DNS servers."];
        } else if (error?.code === 'EEOF') {
            return ["Error: End of file."];
        } else if (error?.code === 'EFILE') {
            return ["Error: Error reading file."];
        } else if (error?.code === 'ENOMEM') {
            return ["Error: Out of memory."];
        } else if (error?.code === 'EDESTRUCTION') {
            return ["Error: Channel is being destroyed."];
        } else if (error?.code === 'EBADSTR') {
            return ["Error: Misformatted string."];
        } else if (error?.code === 'EBADFLAGS') {
            return ["Error: Illegal flags specified."];
        } else if (error?.code === 'ENONAME') {
            return ["Error: Given host name is not numeric."];
        } else if (error?.code === 'EBADHINTS') {
            return ["Error: Illegal hints flags specified."];
        } else if (error?.code === 'ENOTINITIALIZED') {
            return ["Error: c-ares library initialization not yet performed."];
        } else if (error?.code === 'ELOADIPHLPAPI') {
            return ["Error: Error loading iphlpapi.dll."];
        } else if (error?.code === 'EADDRGETNETWORKPARAMS') {
            return ["Error: Could not find GetNetworkParams function."];
        } else if (error?.code === 'ECANCELLED') {
            return ["Error: DNS query cancelled."];
        }
    });
}

exports.handler = async (event, context) => {
    // TODO implement
    const x = await myDnsRequest(event.queryStringParameters.inputDnsServer, event.queryStringParameters.inputFqdn, event.queryStringParameters.inputRecordType);
    const result = {inputFqdn: event.queryStringParameters.inputFqdn, inputRecordType: event.queryStringParameters.inputRecordType, response: x}
    const response = {
        statusCode: 200,
        body: JSON.stringify(result),
        headers: {'Content-Type': 'application/json'}
    };
    return response;
};
