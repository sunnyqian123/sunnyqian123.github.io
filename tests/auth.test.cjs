const assert=require('assert'),setup=require('./harness.cjs');
(async()=>{let t=setup(),run=t.run;await run('authReady');let n=0;function test(name,s){assert.ok(run(s),name);console.log('PASS '+name);n++;}
test('Sample accounts','accounts.length===2');test('No plaintext passwords',"!localStorage.getItem(ACCOUNT_KEY).includes('Demo123')");test('Guest has no mutation role','!canAccess(true)&&!canAccess(false)');
await assert.rejects(run("signIn('alex@example.com','wrong','client')"));test('Wrong password rejected','currentAccount()===null');
await assert.rejects(run("signIn('alex@example.com','ClientDemo123!','agent')"));test('Wrong role login rejected','currentAccount()===null');
await run("signIn(' ALEX@example.com ','ClientDemo123!','client')");test('Client session has role and login state in localStorage',"canAccess(false)&&!canAccess(true)&&JSON.parse(localStorage.getItem(SESSION_KEY)).role==='client'&&JSON.parse(localStorage.getItem(SESSION_KEY)).loggedIn===true");
run('signOut()');test('Sign-out clears session','currentAccount()===null');
await assert.rejects(run("register('Casey Parker','casey@gmail.com','Testing123!','Testing123!','client')"));test('Fictional email required','accounts.length===2');
await assert.rejects(run("register('Casey Parker','casey@example.com','Testing123!','Mismatch','client')"));test('Confirmation mismatch rejected','accounts.length===2');
await assert.rejects(run("register('Alex Morgan','new@example.com','Testing123!','Testing123!','client')"));test('Existing client identity cannot be claimed','accounts.length===2');
await run("register('Casey Parker','casey@example.com','Testing123!','Testing123!','client')");test('Client signup','accounts.length===3');
await assert.rejects(run("register('Other Name','CASEY@example.com','Testing123!','Testing123!','client')"));test('Duplicate email rejected','accounts.length===3');
await run("register('Robin Agent','robin@example.com','Testing123!','Testing123!','agent')");await run("signIn('robin@example.com','Testing123!','agent')");test('Agent role','canAccess(true)&&!canAccess(false)');
t=setup(t.shared);run=t.run;await run('authReady');test('Persistent role survives fresh page',"currentAccount().name==='Robin Agent'&&canAccess(true)");
run("localStorage.setItem(SESSION_KEY,JSON.stringify({id:'demo-alex',role:'agent',loggedIn:true,expires:Date.now()+10000}))");test('Role/account mismatch rejected','currentAccount()===null');
run("localStorage.setItem(SESSION_KEY,JSON.stringify({id:'demo-alex',role:'client',loggedIn:true,expires:1}))");test('Expired session denied','currentAccount()===null');
console.log(n+' auth checks passed.');})().catch(e=>{console.error(e);process.exitCode=1;});
