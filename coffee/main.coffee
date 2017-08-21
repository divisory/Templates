$ document
	.ready ->

		waitForFinalEvent = do ->
			timers = {}
			(callback, ms, uniqueId) ->
				if !uniqueId
					uniqueId = 'Don\'t call this twice without a uniqueId'
				if timers[uniqueId]
					clearTimeout timers[uniqueId]
				timers[uniqueId] = setTimeout(callback, ms)
				return

		###teleport###
		(teleport = ->
			$('[data-tablet]').each (i, elem)->
				if $(document).width() <= 992
					$(elem).appendTo $ $(elem).data 'tablet'
				else
					parent = $ $(elem).data 'desktop'
					$(elem).appendTo parent
				return
			$('[data-mobile]').each (i, elem)->
				if $(document).width() <= 768
					$(elem).appendTo $ $(elem).data 'mobile'
				else
					parent = $ $(elem).data 'desktop'
					$(elem).appendTo parent
				return
			return
		)()

		###scrollto###
		$ '[data-scrollto]'
			.click (e)->
				e.preventDefault()
				$('html,body').animate
					scrollTop: $($(@).data('scrollto')).offset().top
				, 500
				return

		# footer
		setFooterHeight = ->
			footerHeight = $('.main-footer').outerHeight()
			$('main').css
				paddingBottom: footerHeight + 'px'
			$('.main-footer').css
				marginTop: - footerHeight + 'px'
			return
		setFooterHeight()


		# resize
		$(window).resize ->
			waitForFinalEvent (->

				setFooterHeight()
				teleport()

				return
			), 200, ''
			return

		return