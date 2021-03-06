'use strict';
$(() => {
	const pronouns = [
		'He/Him',
		'She/Her'
	];

	if (isOffline) {
		loadOffline();
	} else {
		loadFromSpeedControl();
	}

	function loadOffline() {
		// Game data
		let gameTitle = $('#game-name');
		let gameCategory = $('#category');
		let gameSystem = $('#platform');
		let gameYear = $('#year');
		let gameEstimate = $('#estimate');

		// Runners
		let name1 = $('#runner-name1');
		let pronouns1 = $('#pronouns1');

		let name2 = $('#runner-name2');
		let pronouns2 = $('#pronouns2');

		let name3 = $('#runner-name3');
		let pronouns3 = $('#pronouns3');

		let name4 = $('#runner-name4');
		let pronouns4 = $('#pronouns4');

		// Apply to html
		gameTitle.html('Metroid Prime: Hunters');
		gameCategory.html('All Items');
		gameSystem.html('DS');
		gameYear.html('2006');
		gameEstimate.html('01:45:00');

		name1.text('Mr_Shasta');
		pronouns1.text('He/Him');

		name2.text('Claris');
		pronouns2.text('She/Her');

		name3.text('TGH');
		pronouns3.text('He/Him');

		name4.text('Venmi');
		pronouns4.text('She/Her');
	}

	function loadFromSpeedControl() {
		// The bundle name for speedcontrol
		const speedcontrolBundle = 'nodecg-speedcontrol';

		// JQuery selectors.
		let gameTitle = $('#game-name');
		let gameCategory = $('#category');
		let gameSystem = $('#platform');
		let gameYear = $('#year');
		let gameEstimate = $('#estimate');

		// This is where the information is received for the run we want to display.
		// The "change" event is triggered when the current run is changed.
		let runDataActiveRun = nodecg.Replicant('runDataActiveRun', speedcontrolBundle);
		runDataActiveRun.on('change', (newVal, oldVal) => {
			if (newVal)
				updateSceneFields(newVal);
		});

		// Sets information on the pages for the run.
		function updateSceneFields(runData) {
			let currentTeamsData = getRunnersFromRunData(runData);

			// Split year out from system platform, if present.
			gameTitle.html(runData.game);
			runFitText('#game-name', gameNameWidth);

			gameCategory.html(runData.category);
			runFitText('#category', categoryNameWidth);

			gameSystem.html(runData.system);
			gameYear.html(runData.release);
			gameEstimate.html(runData.estimate);

			// Set each player names and pronouns.
			$('.runner-name').add('.pronouns').text('');
			$('.runner-details').data('teamID', '');
			let i = 0;
			for (let team of currentTeamsData) {
				for (let player of team.players) {
					$('#runner-name' + (i + 1)).text(player.name);
					runFitText('#runner-name' + (i + 1), runnerNameWidth);

					// Set pronouns
					if (pronouns[i]) {
						$('#pronouns' + (i + 1)).text(pronouns[i]);
					}

					$('#runner-details' + (i + 1)).data('teamID', player.teamID);
					i += 1;
				}
			}
		}
	}
});
