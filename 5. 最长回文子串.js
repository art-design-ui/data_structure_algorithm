/**
 * @param {string} s
 * @return {string}
 */
/**
 * 动态规划求最值（列出正确的状态转移方程）：1.确定 base case  2.确定「状态」，也就是原问题和子问题中会变化的变量 3.明确 dp 函数/数组的定义
 * 找出状态转移方程
 * 我们要拆成子问题来看 很明显子问题受回文字符头i和尾部j（所以dp用二维数组表示）控制 可以得出定义 p[i][j]为“s[i...j]是否为回文字符串
 * ”如果是p[i][j]=true，否则p[i][j]=false。 则p[i][j]=p[i+1][j-1] && s[i]==s[j] 
 */

// 解法三：动态规划 - B
// 状态定义
// dp[i,j]：字符串s从索引i到j的子串是否是回文串
// true： s[i,j] 是回文串
// false：s[i,j] 不是回文串
// 转移方程
// dp[i][j] = dp[i+1][j-1] && s[i] == s[j]
// s[i] == s[j]：说明当前中心可以继续扩张，进而有可能扩大回文串的长度
// dp[i+1][j-1]：true
// 说明s[i,j]的**子串s[i+1][j-1]**也是回文串
// 说明，i是从最大值开始遍历的，j是从最小值开始遍历的
// 特殊情况
// j - i < 2：意即子串是一个长度为0或1的回文串
// 总结
// dp[i][j] = s[i] == s[j] && ( dp[i+1][j-1] || j - i < 2)

// 先穷举(连续的情况 少了很多排列的可能性) 再来思考如何写 穷举的过程就已经形成框架了
// 然后再拆解子问题 形成状态转移方程
var longestPalindrome = function (s) {
    let n = s.length
    let str = ''
    let dp = Array.from(new Array(n), () => new Array(n).fill(0))
    // 倒着写是因为dp[i+1][j-1] 子问题
    for (let i = n - 1; i >= 0; i--) {
        for (let j = i; j < n; j++) {
            /**
             * 子问题的拆解
             * 除了dp[i+1][j-1]是回文字符串外
             * 还有一种可能就是长度为0或者1的回文字符串
             * (j-i<2||dp[i+1][j-1]) 注意写法顺序
             * dp[5][5]   dp[6][4]是dp[5][5]的子问题 此时是溢出的条件 dp[5][5]是单个字符串
             * 也可以当做回文的 正常一点的场景是 dp[2][4]是dp[1][5]的子问题
             * 因为我们要求最值 所以从子问题分析入手
             */
            dp[i][j] = s[i] === s[j] && (j - i < 2 || dp[i + 1][j - 1])
            if (dp[i][j] && j - i + 1 > str.length) {
                str = s.substring(i, j + 1)
            }
        }
    }
    return str
};