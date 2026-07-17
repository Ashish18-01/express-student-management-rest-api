class APIFeatures {
    constructor(model, queryString) {
        this.model = model;
        this.queryString = queryString;
        this.filterObj = {};
        this.query = null;
    }

    filter() {
        const queryObj = { ...this.queryString };

        const excludeFields = [
            "page",
            "limit",
            "sort",
            "search",
            "fields"
        ];

        excludeFields.forEach(field => delete queryObj[field]);

        this.filterObj = {
            ...this.filterObj,
            ...queryObj
        };

        return this;
    }

    search() {
        if (this.queryString.search) {
            this.filterObj.name = {
                $regex: this.queryString.search,
                $options: "i"
            };
        }

        return this;
    }

    buildQuery() {
        this.query = this.model.find(this.filterObj);

        return this;
    }

    sort() {
        if (this.queryString.sort) {
            this.query = this.query.sort(this.queryString.sort);
        } else {
            this.query = this.query.sort("-createdAt");
        }

        return this;
    }


    limitFields() {
    if (this.queryString.fields) {
        const fields = this.queryString.fields
            .split(",")
            .join(" ");

        this.query = this.query.select(fields);
    } else {
        this.query = this.query.select("-__v");
    }

    return this;
}

    paginate() {
        const page = Number(this.queryString.page) || 1;
        const limit = Number(this.queryString.limit) || 10;
        const skip = (page - 1) * limit;

        this.query = this.query
            .skip(skip)
            .limit(limit);

        return this;
    }
}

module.exports = APIFeatures;