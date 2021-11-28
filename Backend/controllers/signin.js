const handleSignin = (client) => (req, res) => {
    const { SSN } = req.body;
    if (!SSN) {
      return res.status(400).json('Incorrect form submission');
    }
    const query=`SELECT * FROM users 
    WHERE SSN='${SSN};`;
    
    client.query(query)
    .then(data => {
      if(data.rows.length==0){
        res.status(400).json('Wrong SSN')
      }
      else{
        console.log(data.rows[0])
        res.json(data.rows[0])
      }
    })
    .catch(err => {
        console.error(err => res.status(400).json('unable to get user'));
    })
    .finally(() => {
        console.log('Run successfully');
    });
  }
/*
    db.select('email').from('adminlogin')
      .where('email', '=', email)
      .then(data => {
        if (data=='t') {
          return db.select('*').from('users')
            .where('email', '=', email)
            .then(user => {
              res.json(user[0])
            })
            .catch(err => res.status(400).json('unable to get user'))
        } else {
          res.status(400).json('wrong credentials')
        }
      })
      .catch(err => res.status(400).json('wrong credentials'))
  }
  */
  module.exports = {
    handleSignin: handleSignin
  }