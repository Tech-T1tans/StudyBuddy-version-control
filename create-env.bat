@echo off
echo Creating .env file for quiz server...
(
echo # OpenRouter API Configuration
echo OPENROUTER_API_KEY=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
echo OPENROUTER_MODEL=anthropic/claude-3-haiku
) > .env
echo .env file created successfully!
pause
