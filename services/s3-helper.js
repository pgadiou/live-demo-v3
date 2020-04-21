const P = require('bluebird');
const parseDataUri = require('parse-data-uri');
const AWS = require('aws-sdk');
const filesize = require('filesize');

function S3Helper() {
  // function mapAttrs(file) {
  //   return {
  //     id: file.Key.replace('livedemo/legal/', ''),
  //     url: `https://s3-eu-west-1.amazonaws.com/${process.env.S3_BUCKET}/${file.Key}`,
  //     last_modified: file.LastModified,
  //     size: filesize(file.Size),
  //   }
  // }

  this.upload = (rawData, filename) => new P((resolve, reject) => {
    // Create the S3 client.
    const s3Bucket = new AWS.S3({ params: { Bucket: process.env.S3_BUCKET } });
    const parsed = parseDataUri(rawData);
    const base64Image = rawData.replace(/^data:(image|application)\/\w+;base64,/, '');

    const data = {
      Key: filename,
      Body: new Buffer(base64Image, 'base64'),
      ContentEncoding: 'base64',
      ContentDisposition: 'inline',
      ContentType: parsed.mimeType,
      // ACL: 'public-read'
    };
      // Upload the image.
    s3Bucket.upload(data, (err, response) => {
      if (err) {
        return reject(err);
      }
      return resolve(response);
    });
  });

  // this.files = (prefix) => {
  //   const s3 = new AWS.S3();

  //   let files = [];

  //   return new P((resolve, reject) => {
  //     return s3.listObjects({
  //       Bucket: process.env.S3_BUCKET,
  //       Prefix: prefix
  //     }).on('success', function handlePage(r) {
  //       files.push(...r.data.Contents);

  //       if(r.hasNextPage()) {
  //         r.nextPage().on('success', handlePage).send();
  //       } else {
  //         return resolve(files.map((f) => mapAttrs(f)));
  //       }
  //     }).on('error', (err) => {
  //       reject(err);
  //     }).send();
  //   });
  // };

  // this.file = (key) => {
  //   const s3 = new AWS.S3();

  //   let files = [];

  //   return new P((resolve, reject) => {
  //     return s3.listObjects({
  //       Bucket: process.env.S3_BUCKET,
  //       Prefix: key,
  //     }).on('success', (file) => {
  //       return resolve(mapAttrs(file.data.Contents[0]));
  //     }).on('error', (err) => {
  //       reject(err);
  //     }).send();
  //   });
  // };

  // this.deleteFile = (key) => {
  //   const s3 = new AWS.S3();

  //   return new P((resolve, reject) => {
  //     return s3.deleteObjects({
  //       Bucket: process.env.S3_BUCKET,
  //       Delete: {
  //         Objects: [{ Key: key }]
  //       }
  //     }).on('success', () => resolve())
  //     .on('error', (err) => reject(err))
  //     .send();
  //   });
  // };

  // this.updateFile = (key, newKey) => {
  //   const s3 = new AWS.S3();

  //   return new P((resolve, reject) => {
  //     return s3.copyObject({
  //       Bucket: process.env.S3_BUCKET,
  //       CopySource: process.env.S3_BUCKET + '/' + key,
  //       Key: newKey,
  //       MetadataDirective: 'REPLACE'
  //     }).on('success', (file) => {
  //       return this
  //         .deleteFile(key)
  //         .then(() => {
  //           return resolve(this.file(newKey));
  //         });
  //     })
  //     .on('error', (err) => reject(err))
  //     .send();
  //   });
  // };
}

module.exports = S3Helper;
