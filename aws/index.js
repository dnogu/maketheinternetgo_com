const dns = require('dns').promises;

function myDnsRequest(inputDnsServer, inputFqdn, inputRecordType) {
    if (inputDnsServer != "default") {
        dns.setServers([inputDnsServer]);
    }
    return dns.resolve(inputFqdn, inputRecordType).catch((error) => {
        if (error?.code === 'ENODATA') {
            return ["DNS server returned answer with no data."];
        } else if (error?.code === 'EFORMERR') {
            return ["DNS server claims query was misformatted."];
        } else if (error?.code === 'ESERVFAIL') {
            return ["DNS server returned general failure."];
        } else if (error?.code === 'ENOTFOUND') {
            return ["Domain name not found."];
        } else if (error?.code === 'ENOTIMP') {
            return ["DNS server does not implement requested operation."];
        } else if (error?.code === 'EREFUSED') {
            return ["DNS server refused query."];
        } else if (error?.code === 'EBADQUERY') {
            return ["Misformatted DNS query."];
        } else if (error?.code === 'EBADNAME') {
            return ["Misformatted host name."];
        } else if (error?.code === 'EBADFAMILY') {
            return ["Unsupported address family."];
        } else if (error?.code === 'EBADRESP') {
            return ["Misformatted DNS reply."];
        } else if (error?.code === 'ECONNREFUSED') {
            return ["Could not contact DNS servers."];
        } else if (error?.code === 'ETIMEOUT') {
            return ["Timeout while contacting DNS servers."];
        } else if (error?.code === 'EEOF') {
            return ["End of file."];
        } else if (error?.code === 'EFILE') {
            return ["Error reading file."];
        } else if (error?.code === 'ENOMEM') {
            return ["Out of memory."];
        } else if (error?.code === 'EDESTRUCTION') {
            return ["Channel is being destroyed."];
        } else if (error?.code === 'EBADSTR') {
            return ["Misformatted string."];
        } else if (error?.code === 'EBADFLAGS') {
            return ["Illegal flags specified."];
        } else if (error?.code === 'ENONAME') {
            return ["Given host name is not numeric."];
        } else if (error?.code === 'EBADHINTS') {
            return ["Illegal hints flags specified."];
        } else if (error?.code === 'ENOTINITIALIZED') {
            return ["c-ares library initialization not yet performed."];
        } else if (error?.code === 'ELOADIPHLPAPI') {
            return ["Error loading iphlpapi.dll."];
        } else if (error?.code === 'EADDRGETNETWORKPARAMS') {
            return ["Could not find GetNetworkParams function."];
        } else if (error?.code === 'ECANCELLED') {
            return ["DNS query cancelled."];
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
