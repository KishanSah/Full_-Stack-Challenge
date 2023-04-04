import  mongoose from 'mongoose';

const ScanResult = new mongoose.Schema({
    //id: {type: mongoose.ObjectId},
    status: {
        type: String,
        enum: ['Queued', 'In-Progress', 'Success', 'Failure'],
        required: true
    },
    repository: {
        type: String,
        required: true
    },
    findings: [{
       type:{
            type:String,
           required:true
       },
       ruleId: {
           type: String,
          required: true
       },
       location: {
        path: {
            type: String,
           required: true
        },
        positions: {
            begin: {
                line: { 
                    type: Number, 
                //    required: true 
                }
            }
        }
    },
    metadata: {
        description: {
            type: String,
           required: false
        },
        severity: {
            type: String,
            enum: ['High', 'Medium', 'Low'],
             required: false
        }
    }
    }],
    queuedAt: {
        type: String,
        // default: Date.now
        // required:true
    },
    scanningAt: {
        type: String,
        // default: Date.now
        // required:true
    },
    finishedAt: {
        type: String,
        // default: Date.now
        // required:true
    },
})

const ScanResults = mongoose.model('ScanResults',ScanResult);


export default ScanResults;