<script lang="ts">
	import { _ } from 'svelte-i18n';
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
					<label class="formQuestion" for="search-string"
						>{$_('edu_search_label')}</label
					>
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
					multiple={true}
				>
					<option value="1000">Option I</option>
					<option value="1001">Option II</option>
					<option value="1002">Option III</option>
				</select>
				<label class="formQuestion" for="faculty"
					>{$_('edu_faculty_label')}</label
				>
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
					multiple={true}
				>
					<option value="education_type_1">Education Type I</option>
					<option value="education_type_2">Education Type II</option>
				</select>
				<label class="formQuestion" for="study_type"
					>{$_('edu_study_type_label')}</label
				>
				<span class="custom-select___remover" aria-hidden="true" />
			</div>
			<div class="search__holder select2__wrapper">
				<select
					class="custom-select"
					name="city"
					id="city"
					data-searchparam="city"
					multiple={true}
				>
					<option value="option_study_1">Study I</option>
					<option value="option_study_2">Study II</option>
				</select>
				<label class="formQuestion" for="location"
					>{$_('edu_location_label')}</label
				>
				<span class="custom-select___remover" aria-hidden="true" />
			</div>
		</div>

		<div class="search__third-row">
			<div class="search__extra-holder">
				<button class="search__reset not-default" data-searchpage="reset"
					>{$_('edu_form_reset')}</button
				>
				<div class="listing__type">
					<span>List</span>
					<span>Grid</span>
				</div>
			</div>
		</div>
	</div>
</div>
