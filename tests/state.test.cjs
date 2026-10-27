const assert=require('assert'),setup=require('./harness.cjs');
(async()=>{const t=setup(),run=t.run;await run('authReady');let n=0;function test(name,s){assert.ok(run(s),name);console.log('PASS '+name);n++;}
test('Existing appointment schema is valid','valid(state)');
test('Booking conflict detection',"busy(agents[0],day(1),'10:00')&&!busy(agents[0],day(1),'09:00')");
test('Current record excluded from conflict',"!busy(agents[0],day(1),'10:00','sample-1')");
test('Past dates rejected',"!future('2020-01-01','09:00')");
test('User input escaped',"esc('<script>')==='&lt;script&gt;'");
test('Invalid stored automations rejected','!valid({...state,automation:[null]})');
await run("signIn('agent@example.com','AgentDemo123!','agent')");run("location.hash='#business';render()");
test('Delivered email can receive replies',"requestView({...state.requests[2],status:'Completed'},true).includes('thread-form')");
test('Eligible automations','runAutomations();state.automation.length===2&&state.requests[2].status==="Completed"');
test('Idempotent automations','runAutomations();state.automation.length===2');
test('Appointment data persisted','JSON.parse(localStorage.getItem(KEY)).automation.length===2');
test('Empty filter state',"search='no-such-client';workspaceContent().includes('No matching requests')");
console.log(n+' state checks passed.');})().catch(e=>{console.error(e);process.exitCode=1;});
