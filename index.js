module.exports = function FastVelik(dispatch) {
    
    let cid, inVelik, enabled = false // true = Enabled by default

    dispatch.hook('S_LOGIN', 2, (event) => {cid = event.cid});
	
	dispatch.hook('C_CHAT', 1, event => {
		if(/^<FONT>!fastvs<\/FONT>$/i.test(event.message)) {
			if(!enabled) {
				enabled = true
				message('FastVelik <font color="#00ff99">Enabled</font>')
			}
			else {
				enabled = false
				message('FastVelik <font color="#ff3300">Disabled</font>')
			}
			return false
		}
	})
	
	function message(msg) {
		dispatch.toClient('S_CHAT', 1, {
			channel: 24,
			authorID: 0,
			unk1: 0,
			gm: 0,
			unk2: 0,
			authorName: '',
			message: msg
		})
	}
	
    dispatch.hook('S_LOAD_TOPO', 1, (event) => {      
        inVelik = (event.zone === 9781);
    });
	
    dispatch.hook('S_SPAWN_ME', 1, (event) => {
        if(enabled && inVelik) {
            event.x = 39379;
            event.y = -113115;
            event.z = 17213;
			event.w = 8211;
            return true;
        }
    })

}
