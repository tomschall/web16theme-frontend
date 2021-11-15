<script>
	import { Router, Route, Link } from 'svelte-navigator';
	export let name;
</script>

<Router>
	<main>
		<div>
			<h1>Router TEST</h1>

			<nav>
				<Link to="/">main</Link>
				<Link to="home">home</Link>
				<Link to="about">about</Link>
			</nav>
		</div>

		<div>
			<Route path="/">
				<h3>Hello {name}! Yes...</h3>
				<p>
					Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to
					learn how to build Svelte apps.
				</p>
			</Route>

			<Route path="home">
				<h3>Home</h3>
				<p>Home sweet home...</p>
			</Route>

			<Route path="about">
				<h3>About</h3>
				<p>That's what it's all about!</p>
			</Route>
		</div>
	</main>
</Router>

<style>
	div {
		text-align: center;
		max-width: 240px;
		margin: 0 auto;
		padding: 0 34px 0 374px;
	}
	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
	@media (min-width: 640px) {
		div {
			max-width: none;
		}
	}
</style>
