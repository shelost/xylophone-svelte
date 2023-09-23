export async function load({ params }) {

	try {
		// Fetch data from Supabase
		const { data: note, error } = await supabaseClient
		 	.from('pages')
		 	.select('*')
		 	.eq('id', params.slug)
		 	.single();

		if (error) {
			throw new Error(error.message);
		}

		// Call AWS Lambda function
		const lambdaResponse = await fetch('https://fcuexopxqi.execute-api.us-east-2.amazonaws.com', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ slug: params.slug })
		});

		if (!lambdaResponse.ok) {
			throw new Error(`Lambda call failed with status: ${lambdaResponse.status}`);
		}

		const note2 = await lambdaResponse.json();

		// Additional processing if required using note2

		// Return Supabase data
		return note;

	} catch (e) {
		throw Error(`Could not find space with id ${params.slug}: ${e.message}`);
	}
}
