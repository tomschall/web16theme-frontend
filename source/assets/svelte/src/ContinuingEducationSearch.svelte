<script lang="ts">
	console.log('CONTINUNING EDUCATION FORM');
</script>

<div class="search__wrapper">
	<div class="search__form-wrapper">
		<div>
			<div class="search__holder__searchstring">
				<div class="search__string">
					<input
						type="text"
						value=""
						id="search-string"
						name="search-string"
						data-searchpage="query"
						data-searchparam="q"
					/>
					<label class="formQuestion" for="search-string">LABEL SEARCH</label>
				</div>
			</div>
		</div>
		<div>
			<div class="search__holder select2__wrapper">
				<select
					id="taxonomy_subjectarea"
					name="taxonomy_subjectarea"
					data-searchparam="taxonomy_subjectarea"
					class="custom-select"
					multiple="multiple"
				>
					<option value="1000">Option I</option>
					<option value="1001">Option II</option>
					<option value="1002">Option III</option>
				</select>
				<label class="formQuestion" for="faculty">Label Faculty</label>
				<span class="custom-select___remover" aria-hidden="true" />
			</div>

			<div class="search__holder select2__wrapper">
				<span
					aria-hidden="true"
					class="is_hidden taxonomy_eduproducttype_hidden_option"
				/>
				<select
					class="custom-select"
					id="taxonomy_eduproducttype"
					name="taxonomy_eduproducttype"
					data-searchparam="taxonomy_eduproducttype"
					multiple="multiple"
				>
					<option value="education_type_1">Education Type I</option>
					<option value="education_type_2">Education Type II</option>
				</select>
				<label class="formQuestion" for="study_type">Label Study</label>
				<span class="custom-select___remover" aria-hidden="true" />
			</div>
			<div class="search__holder select2__wrapper">
				<select
					class="custom-select"
					name="city"
					id="city"
					data-searchparam="city"
					multiple="multiple"
				>
					<option value="option_study_1">Study I</option>
					<option value="option_study_2">Study II</option>
				</select>
				<label class="formQuestion" for="location">Label Location</label>
				<span class="custom-select___remover" aria-hidden="true" />
			</div>
		</div>

		<div class="search__third-row">
			<div class="search__extra-holder">
				<button class="search__reset not-default" data-searchpage="reset"
					>Reset</button
				>
			</div>
			<div class="search__extra-holder element-hidden">
				<span data-searchpage="countNumber" />&nbsp;
				<span class="search__countNumber___text" />
			</div>
		</div>
	</div>
</div>
