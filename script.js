document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');
    const suggestionsList = document.getElementById('suggestionsList');
    const togglePassword = document.getElementById('togglePassword');

    // 移除切换密码显示/隐藏功能
    togglePassword.addEventListener('click', () => {
        // 确保始终为密码模式
        passwordInput.type = 'password';
        togglePassword.querySelector('span').textContent = '🔒';
    });
    
    // 确保初始状态为密码模式
    passwordInput.type = 'password';
    togglePassword.querySelector('span').textContent = '🔒';

    // 密码强度评估函数
    function evaluatePasswordStrength(password) {
        if (!password) return { score: null, suggestions: [] };

        let score = 0;
        const suggestions = [];

        // 检查长度
        if (password.length < 8) {
            suggestions.push('密码长度应至少为8个字符');
            // 对于非常短的密码（小于3个字符）直接评为非常弱
            if (password.length < 3) {
                score = 0;
                return { score, suggestions };
            }
        } else {
            score += Math.min(2.5, password.length / 8);
        }

        // 检查字符类型
        const hasLower = /[a-z]/.test(password);
        const hasUpper = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (!hasLower) suggestions.push('添加小写字母可以提高密码强度');
        if (!hasUpper) suggestions.push('添加大写字母可以提高密码强度');
        if (!hasNumber) suggestions.push('添加数字可以提高密码强度');
        if (!hasSpecial) suggestions.push('添加特殊字符可以提高密码强度');

        // 字符类型得分
        const charTypeScore = (hasLower ? 1 : 0) + (hasUpper ? 1.2 : 0) + 
                             (hasNumber ? 1 : 0) + (hasSpecial ? 1.5 : 0);
        score += charTypeScore;

        // 计算密码熵值
        const charSet = (hasLower ? 26 : 0) + (hasUpper ? 26 : 0) + 
                       (hasNumber ? 10 : 0) + (hasSpecial ? 32 : 0);
        if (charSet > 0) {
            const entropy = Math.log2(Math.pow(charSet, password.length));
            score += entropy / 20; // 归一化熵值得分
        }

        // 检查重复字符
        const charFreq = {};
        for (const char of password) {
            charFreq[char] = (charFreq[char] || 0) + 1;
        }
        const maxRepeat = Math.max(...Object.values(charFreq));
        if (maxRepeat > 2) {
            suggestions.push('避免使用过多重复的字符');
            score -= maxRepeat * 0.3;
        }

        // 检查连续字符
        const consecutivePattern = /(\d{3,}|abc|def|ghi|jkl|mno|pqr|stu|vwx|yz|ABC|DEF|GHI|JKL|MNO|PQR|STU|VWX|YZ|qwe|asd|zxc|QWE|ASD|ZXC)/;
        if (consecutivePattern.test(password)) {
            suggestions.push('避免使用连续的字母或数字');
            score -= 1.5;
        }

        // 检查键盘布局模式
        const keyboardPatterns = [
            /qwerty/i, /asdfgh/i, /zxcvbn/i, /12345/i,
            /qazwsx/i, /zxcvbn/i, /!@#\$%/
        ];
        if (keyboardPatterns.some(pattern => pattern.test(password))) {
            suggestions.push('避免使用键盘上连续的字符');
            score -= 1.2;
        }

        // 常见密码检查
        const commonPasswords = [
            'password', 'password123', '123456', 'admin', 'qwerty', '111111',
            'abc123', 'letmein', '123123', 'monkey', 'dragon', 'baseball'
        ];
        if (commonPasswords.includes(password.toLowerCase())) {
            suggestions.push('请勿使用常见密码');
            score = 0;
        }

        // 检查数字和特殊字符的位置分布
        const isAllEndingNumbers = /^[^0-9]*[0-9]+$/.test(password);
        const isAllEndingSpecial = /^[^!@#$%^&*(),.?":{}|<>]*[!@#$%^&*(),.?":{}|<>]+$/.test(password);
        if (isAllEndingNumbers || isAllEndingSpecial) {
            suggestions.push('建议将数字和特殊字符分散到密码的不同位置');
            score -= 0.8;
        }

        // 确保分数在0-10之间
        score = Math.max(0, Math.min(10, score));

        return { score, suggestions };
    }

    // 更新UI显示
    function updateStrengthIndicator(score) {
        let strengthClass = '';
        let strengthLabel = '';

        if (score === null) {
            strengthClass = '';
            strengthLabel = '未检测';
        } else if (score === 0) {
            strengthClass = 'strength-very-weak';
            strengthLabel = '非常弱';
        } else if (score < 4) {
            strengthClass = 'strength-weak';
            strengthLabel = '弱';
        } else if (score < 6) {
            strengthClass = 'strength-medium';
            strengthLabel = '中等';
        } else if (score < 8) {
            strengthClass = 'strength-strong';
            strengthLabel = '强';
        } else {
            strengthClass = 'strength-very-strong';
            strengthLabel = '非常强';
        }

        strengthBar.className = 'strength-bar ' + strengthClass;
        strengthText.textContent = `密码强度: ${strengthLabel}`;
    }

    // 监听密码输入
    passwordInput.addEventListener('input', () => {
        const { score, suggestions } = evaluatePasswordStrength(passwordInput.value);
        updateStrengthIndicator(score);

        // 更新建议列表
        suggestionsList.innerHTML = suggestions
            .map(suggestion => `<li>${suggestion}</li>`)
            .join('');
    });
});
