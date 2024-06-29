
	export function getToken() {
		const cookies = document.cookie.split(";");
		let csrfToken = "";
		for (let index = 0; index < cookies.length; index++) {
			const cookie = cookies[index];
			if (cookie.startsWith("csrftoken=")) {
				csrfToken = cookie.split("=")[1];
			}
		}

		return csrfToken;
	}
