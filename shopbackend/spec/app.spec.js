let Request = require('request');

var url = "http://localhost:5000/";
var token;
var productId;

describe("API Get Products", () => {
    let data = {};
    
    beforeAll((done) => {
        Request({
            method: 'GET',
            uri: url + 'products',
            json: false
        },(error, response, body) => {
            data.status = response.statusCode;
            data.body = JSON.parse(body);
            productId = data.body[0]._id;
            done();
        });
    });

    it("status 200", () => {
        expect(data.status).toBe(200);
    });

    it('length products', () => {
        expect(data.body.length).toBe(1);
    });
});

describe("API Login",() => {
    let data = {};

    beforeAll((done) => {
        Request({
            method: 'POST',
            uri: url + 'users/login',
            json: true,
            body: {
                username: 'test',
                password: 'test'
            }
        }, (error, response, body) => {
            data.status = response.statusCode;
            data.body = response.body;
            token = response.body.token;
            done();
        });
    });

    it("status 200", () => {
        expect(data.status).toBe(200);
    });

    it("reponds with token", () => {
        expect(data.body.token).toBeDefined();
    });
});

describe("API Like", () => {
    let data = {};

    beforeAll((done) => {
        Request({
            method: 'POST',
            uri: url + 'likes/add/test',
            json: true,
            body: {
                productId: productId
            }
        }, (error, response, body) => {
            data.status = response.statusCode;
            data.body = body;
            done();
        }).auth(null, null, true, token);
    });

    it("status 200", () => {
        expect(data.status).toBe(200);
    });

    it("Succesfull", () => {
        expect(data.body === 'Succesful');
    });
});

describe("API Get Likes", () => {
    let data = {};

    beforeAll((done) => {
        Request({
            method: 'GET',
            uri: url + 'likes/test',
            json: true
        }, (error, response, body) => {
            data.status = response.statusCode;
            data.body = body;
            done();
        }).auth(null, null, true, token);
    });

    it("status 200", () => {
        expect(data.status).toBe(200);
    });

    it("equals 1 like", () => {
        expect(data.body[0]).toBe(productId);
    });

    it("equals 1 like", () => {
        expect(data.body.length).toBe(1);
    });
});

describe("API Unlike", () => {
    let data = {};

    beforeAll((done) => {
        Request({
            method: 'POST',
            uri: url + 'likes/add/test',
            json: true,
            body: {
                productId: productId
            }
        }, (error, response, body) => {
            data.status = response.statusCode;
            data.body = body;
            done();
        }).auth(null, null, true, token);
    });

    it("Succesfull", () => {
        expect(data.body === 'Succesful');
    });
});

describe("API Get Likes", () => {
    let data = {};

    beforeAll((done) => {
        Request({
            method: 'GET',
            uri: url + 'likes/test',
            json: true
        }, (error, response, body) => {
            data.status = response.statusCode;
            data.body = body;
            done();
        }).auth(null, null, true, token);
    });

    it("status 200", () => {
        expect(data.status).toBe(200);
    });

    it("equals 0 like", () => {
        expect(data.body.length).toBe(0);
    });
});